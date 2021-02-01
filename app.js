const express = require('express');
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;


//Routes
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(PORT, () => {
    console.log(`Server running at http:localhost:${PORT}`);
});