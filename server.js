const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// const path = require("path");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//static folder that points to public
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//port listener - runs webserver
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});