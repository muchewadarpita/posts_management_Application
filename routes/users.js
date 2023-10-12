const express = require('express')
const { signup, login } = require('../controllers/userController')
const router = new express.Router();
const {auth}=require('../middleware/auth')

router.post('/signup', signup);
router.post('/login', login)

module.exports = router;
