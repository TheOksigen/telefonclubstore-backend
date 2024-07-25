const express = require('express');
const { register, login, verifyToken } = require('../controllers/LoginControllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', auth, register);
router.get('/verify-token', auth, verifyToken);
router.post('/login', login);

module.exports = router;
