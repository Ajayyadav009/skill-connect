const express = require('express');
const { Register, login, Getme } = require('../controllers/authcontollers.js');

const router = express.Router();

router.post('/Register', Register);
router.post('/login', login);
router.get('/me', Getme);

module.exports = { router };

