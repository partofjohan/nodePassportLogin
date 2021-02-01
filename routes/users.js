const express = require('express');
const router = express.Router();

//Login page
router.get('/login', (request, response) => {
    response.send('Login');
});

//Register page
router.get('/register', (request, response) => {
    response.send('Register');
});

module.exports = router;