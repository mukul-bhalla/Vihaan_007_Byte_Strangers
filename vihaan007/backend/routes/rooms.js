const express = require('express');
const rooms = require('../controllers/room')
const createError = require('../utils/error');
const verifyAdmin = require('../utils/verifyToken');
const router = express.Router();

router.post('/:hotelid', verifyAdmin, rooms.createRoom)


router.put('/:id', verifyAdmin, rooms.updateRoom)

router.delete('/:id/:hotelid', verifyAdmin, rooms.deleteRoom)


router.get('/:id', rooms.getRoom)

router.get('/', rooms.getRoom)


module.exports = router 