////////////////////////
// Setup - Import deps and create app object
////////////////////////

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Animal = require('./models/animal')

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

app.get('/', (req, res) => {
    res.send(`
    <h1>You almost made it!</h1>
    <a href="/animals">Click right here to see a list of animals!</a>`)
})


// Index - GET - Show list of animals - /animals
app.get('/animals', async(req, res) => {
    const allAnimals = await Animal.find({})

    res.render("index.ejs", {animals: allAnimals})
})

// New - GET - 
app.get('/animals/new', (req, res) => {
    res.render('new.ejs')
})

// Delete - DELETE
app.delete('/animals/:id', async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id)
    res.redirect('/animals')
})

// Update - 


// Create - Post - Create an Animal
app.post('/animals', async (req, res) => {
    req.body.extinct = req.body.extinct === "on" ? true : false

    await Animal.create(req.body)
    
    res.redirect('/animals')
})


// Edit - 

//Show - GET -Show individual animal - /animals/:id
app.get('/animals/:id', async (req, res) => {
    const foundAnimal = await Animal.findById(req.params.id)

    res.render('show.ejs', {animal: foundAnimal})
})

///////////////////////////
// Server Listener
///////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});
