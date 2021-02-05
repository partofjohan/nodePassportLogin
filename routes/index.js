const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


//Welcome page
router.get('/', (request, response) => {
    response.render('welcome');
});

//Dashboard
router.get('/dashboard', ensureAuthenticated, (request, response) => { 
    response.render('dashboard', { user: request.user.name });
});

module.exports = router;