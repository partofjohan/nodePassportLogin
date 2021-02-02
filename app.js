const express = require('express');
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


//EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

//Routes
app.use('/', indexRoute);
app.use('/users', usersRoute);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});