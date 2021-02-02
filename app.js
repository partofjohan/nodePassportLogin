const express = require('express');
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');   //Loads environment variables into process.env
const connectDB = require('./config/db');


dotenv.config({ path: './config/config.env' });  //object with the config file path

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

//EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

//Routes
app.use('/', indexRoute);
app.use('/users', usersRoute);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});