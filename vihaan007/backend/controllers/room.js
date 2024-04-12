const Room = require('../models/rooms');
const BNB = require('../models/bnbs');

module.exports.createRoom = async (req, res, next) => {
    const { hotelid } = req.params;
    // console.log(req.params)
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await BNB.findByIdAndUpdate(hotelid, { $push: { rooms: savedRoom._id } })
        } catch (e) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (e) {
        next(err)
    }
}
module.exports.updateRoom = async (req, res, next) => {
    const { hotelid } = req.params;
    try {
        const updateRoom = await Room.findByIdAndUpdate(hotelid, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom)
    } catch (e) {
        next(e);
    }
}
module.exports.deleteRoom = async (req, res, next) => {
    const { hotelid } = req.params;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await BNB.findByIdAndUpdate(hotelid, { $pull: { rooms: req.params.id } })
        } catch (e) {
            next(err)
        }
        res.status(200).json("Room Deleted")
    } catch (e) {
        next(e);
    }
}
module.exports.getRoom = async (req, res, next) => {
    const { hotelid } = req.params;
    try {
        const room = await Room.findById(hotelid);
        res.status(200).json(room);
    } catch (e) {
        next(e);
    }
}
module.exports.getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (e) {
        next(e)
    }
}
