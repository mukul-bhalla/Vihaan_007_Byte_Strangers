const BNB = require('../models/bnbs');

module.exports.createBnb = async (req, res, next) => {
    const newBnb = new BNB(req.body)
    try {
        const savedBnb = await newBnb.save();
        res.status(200).json(savedBnb)
    } catch (e) {
        next(e);
    }
}
module.exports.updateBnb = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updateBnb = await BNB.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json(updateBnb)
    } catch (e) {
        next(e);
    }
}
module.exports.deleteBnb = async (req, res, next) => {
    const { id } = req.params;
    try {
        await BNB.findByIdAndDelete(id);
        res.status(200).json("Hotel Deleted")
    } catch (e) {
        next(e);
    }
}
module.exports.getBnb = async (req, res, next) => {
    const { id } = req.params;
    try {
        const bnb = await BNB.findById(id);
        res.status(200).json(bnb);
    } catch (e) {
        next(e);
    }
}
module.exports.getBnbs = async (req, res, next) => {
    try {
        const bnbs = await BNB.find();
        res.status(200).json(bnbs);
    } catch (e) {
        next(e)
    }
}
