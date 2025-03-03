const CategorySchema = require("../models/category");

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new CategorySchema({ name, description });
        const newDoc = await category.save();
        res.status(201).json(newDoc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getCategories = async (req, res) => {
    try {
        let { searchValue, page, perPage } = req.query
         page = Math.max(1, Number(page) || 1);
         perPage = Math.max(1, Number(perPage) || 10);
        const skipPage = (page - 1) * perPage;

        const query = searchValue
            ? { name: { $regex: searchValue, $options: 'i' } }
            : {};

        const [categorys, totalCategory] = await Promise.all([
            CategorySchema
                .find(query)
                .skip(skipPage)
                .limit(perPage)
                .sort({ createdAt: -1 })
                .lean(),
            CategorySchema.countDocuments(query)
        ]);

        const pages = Math.ceil(totalCategory / perPage);

        res.status(200).json({ categorys, totalCategory, pages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}