const User = require('../models/users')
const bcrypt = require('bcryptjs');
const createError = require('../utils/error');
module.exports.register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save();
        res.status(200).json("User registered successfully")
    } catch (e) {
        next(e);
    }

}
module.exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user)
            return next(createError(404, 'User not found'))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect)
            return next(createError(400, 'Wrong Password or username!'))
        const { password, isAdmin, ...otherDetails } = user._doc
        res.status(200).json(otherDetails)
    } catch (e) {
        next(e);
    }
}