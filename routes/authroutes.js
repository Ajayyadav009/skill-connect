const express = require('express');
const router = express.Router();
const {Register, login, Getme} = requirre('../controllers/authcontollers');

router.post('/Register', Register);
router.post('/login', login);
router.get('/me', Getme);



module.exports = router;

