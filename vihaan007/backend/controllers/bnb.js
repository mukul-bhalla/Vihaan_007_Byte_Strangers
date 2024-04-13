const BNB = require('../models/bnbs');
const Room = require('../models/rooms')

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
    const { min, max, ...others } = req.query;
    try {
        const bnbs = await BNB.find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max } || 10000 });
        res.status(200).json(bnbs);
    } catch (e) {
        next(e)
    }
}

module.exports.countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return BNB.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

module.exports.countByType = async (req, res, next) => {
    try {
        const ranchCount = await BNB.countDocuments({ type: "Ranch" });
        const houseboatCount = await BNB.countDocuments({ type: "Houseboat" });
        const villaCount = await BNB.countDocuments({ type: "Villa" });
        const cottageCount = await BNB.countDocuments({ type: "Cottage" });


        res.status(200).json([
            { type: "Ranch", count: ranchCount },
            { type: "Houseboat", count: houseboatCount },
            { type: "Villa", count: villaCount },
            { type: "Cottage", count: cottageCount }
        ]);
    } catch (err) {
        next(err);
    }
};

module.exports.getBnbRooms = async (req, res, next) => {
    try {
        const bnb = await BNB.findById(req.params.id);
        const list = await Promise.all(
            bnb.rooms.map((room) => {
                return Room.findById(room);
            })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};