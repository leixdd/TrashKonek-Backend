const express = require('express');
const router = express.Router();

router.post('/auth',  (request, response) => {
    //use service
    response.json({ "success": true });
});

module.exports = router;