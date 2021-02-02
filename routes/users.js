const express = require('express');
const router = express.Router();

//Login page
router.get('/login', (request, response) => {
    response.render('login');
});

//Register page
router.get('/register', (request, response) => {
    response.render('register');
});

module.exports = router;