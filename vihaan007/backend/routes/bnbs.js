const express = require('express');
const bnbs = require('../controllers/bnb')
const createError = require('../utils/error');
const verifyAdmin = require('../utils/verifyToken');
const router = express.Router();

router.get("/countByType", bnbs.countByType);
router.get("/countByCity", bnbs.countByCity);
router.get("/room/:id", bnbs.getBnbRooms);

router.post('/', verifyAdmin, bnbs.createBnb)


router.put('/:id', verifyAdmin, bnbs.updateBnb)

router.delete('/:id', verifyAdmin, bnbs.deleteBnb)


router.get('/:id', bnbs.getBnb)

router.get('/', bnbs.getBnbs)


module.exports = router 