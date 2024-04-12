const express = require('express');
const bnbs = require('../controllers/bnb')
const createError = require('../utils/error');
const router = express.Router();

router.post('/', bnbs.createBnb)


router.put('/:id', bnbs.updateBnb)

router.delete('/:id', bnbs.deleteBnb)


router.get('/:id', bnbs.getBnb)

router.get('/', bnbs.getBnbs)


module.exports = router 