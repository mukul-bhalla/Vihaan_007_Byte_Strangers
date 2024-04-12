const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const verifyToken = require('../utils/verifyToken');
const verifyUser = require('../utils/verifyToken');
const verifyAdmin = require('../utils/verifyToken');

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send("Hello User ! You are authenticated");

// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("Hello User ! You are authenticated and you can delete your account");

// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send("Hello User ! You are authenticated and you are ADMIN");

// })

router.put('/:id', verifyUser, user.updateUser);
router.delete('/:id', verifyUser, user.deleteUser);
router.get('/:id', verifyUser, user.getUser);
router.get('/', verifyAdmin, user.getUsers);

module.exports = router 