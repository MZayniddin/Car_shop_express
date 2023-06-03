const { default: mongoose } = require("mongoose");
const Brand = require("../models/Brand");

exports.getAllBrand = async (req, res) => {
    try {
        res.json(await Brand.find());
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.createBrand = async (req, res) => {
    if (!req?.body?.name)
        return res.json({ message: "Category name required" });

    try {
        const result = await Brand.create({
            name: req.body.name,
            image: req.body.image,
        });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.updateBrand = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id");

    const updateBrand = await Brand.findByIdAndUpdate(_id, req.body, {
        new: true,
    });

    res.json(updateBrand);
};

exports.deleteBrand = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id");

    await Brand.findByIdAndDelete(_id);

    res.json({ message: "Brand was deleted successfully!" });
};
