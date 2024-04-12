const User = require('../models/users');

module.exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updateUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser)
    } catch (e) {
        next(e);
    }
}
module.exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json("Hotel Deleted")
    } catch (e) {
        next(e);
    }
}
module.exports.getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
}
module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        next(e)
    }
}
