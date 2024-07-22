const express = require('express');
const { register, login } = require('../controllers/LoginControllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register',auth, register);
router.post('/login', login);

module.exports = router;
