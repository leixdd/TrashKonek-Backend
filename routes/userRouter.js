const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/auth',  (request, response) => {
    //use service
    response.json({ "success": true });
});

router.post('/register', userService.userRegistration);

module.exports = router;