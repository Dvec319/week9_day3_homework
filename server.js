////////////////////////
// Setup - Import deps and create app object
////////////////////////

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();


//////////////////////
// Declare Middleware
//////////////////////

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

///////////////////////
// Declare Routes and Routers
///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show

///////////////////////////
// Server Listener
///////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});
