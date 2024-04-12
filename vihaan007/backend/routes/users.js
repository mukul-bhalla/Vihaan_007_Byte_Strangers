const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("USer Endpoint");
})

module.exports = router 