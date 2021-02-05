const express = require('express');
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');   //Loads environment variables into process.env
const connectDB = require('./config/db');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')


dotenv.config({ path: './config/config.env' });  //object with the config file path

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

//Passport config
require('./config/passport')(passport);

//EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,

}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global vars
app.use((request, response, next) => {
    response.locals.sucessMessage = request.flash('sucessMessage');
    response.locals.errorMessage = request.flash('errorMessage');
    response.locals.error = request.flash('error');
    next();
});

//Routes
app.use('/', indexRoute);
app.use('/users', usersRoute);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});