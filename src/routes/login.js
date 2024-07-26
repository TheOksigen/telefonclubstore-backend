const express = require('express');
const router = express.Router();

const { register, login, verifyToken } = require('../controllers/LoginControllers');

const auth = require('../middlewares/auth.middleware');
const validator = require('../middlewares/validation.middleware');

const authSchema = require('../schema/auth.schema');


router.post('/login', validator(authSchema), login);
router.post('/register', validator(authSchema) , auth, register);
router.get('/verify-token', auth, verifyToken);

module.exports = router;
