const express = require('express');
const passport = require('passport');
const router = express.Router();
const userService = require('../services/userService');

router.post('/auth',  userService.userLogin);
router.post('/register', userService.userRegistration);

//Secured Routes
router.get('/', passport.authenticate('jwt', { session: false }), userService.getUser);

module.exports = router;