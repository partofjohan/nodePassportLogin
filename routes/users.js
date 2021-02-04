const express = require('express');
const router = express.Router();
const User = require('../models/User'); //User model
const bcrypt = require('bcryptjs');

//Login page
router.get('/login', (request, response) => {
    response.render('login');
});

//Register page
router.get('/register', (request, response) => {
    response.render('register');
});

//Register handler
router.post('/register', (request, response) => {
    const { name, email, password, password2 } = request.body;
    let errors = [];

    //Check required fields
    if (!name) {
        errors.push({ text: 'Please add your name' });
    }

    if (!email) {
        errors.push({ text: 'Please add your email' });
    }

    if (!password) {
        errors.push({ text: 'Please add a password' });
    }

    if (!password2) {
        errors.push({ text: 'Please repeat the password' });
    }

    //Check password match
    if (password !== password2){
        errors.push({ text: 'Passwords do not match' });
    }    

    //Check password length
    if (password.length < 6) {
        errors.push({ text: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        response.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    errors.push({ text: 'Email is already registered' });
                    response.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    
                    //Hash pasword
                    bcrypt.genSalt(10, (error, salt) => {
                        bcrypt.hash(newUser.password, salt, (error, hash) => {
                            if(error) {
                                throw error;
                            } else {
                                //Set password to hash
                                newUser.password = hash;
                                newUser.save()
                                    .then((user) => {
                                        response.redirect('/users/login')
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            }
                        });
                    });
                }
            }) 
            .catch(error => {
                console.error(error);
            });
    }
});

module.exports = router; 