////////////////////////
// Setup - Import deps and create app object
////////////////////////

const express = require('express');
const Animal = require('../models/animal');

const router = express.Router();

///////////////////////
// Declare Routes and Routers
///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show

// Index - GET - Show list of animals - /animals
router.get('/', async (req, res) => {
	const allAnimals = await Animal.find({});

	res.render('index.ejs', { animals: allAnimals });
});

// New - GET -  Show a form to create a new animal
router.get('/new', (req, res) => {
	res.render('new.ejs');
});

// Delete - DELETE - Delete an animal
router.delete('/:id', async (req, res) => {
	await Animal.findByIdAndDelete(req.params.id);
	res.redirect('/animals');
});

// Update - Put - Update an Animal
router.put('/:id', async (req, res) => {
	req.body.extinct = req.body.extinct === 'on' ? true : false;

	await Animal.findByIdAndUpdate(req.params.id, req.body);
	res.redirect('/animals');
});

// Create - Post - Create an Animal
router.post('/', async (req, res) => {
	req.body.extinct = req.body.extinct === 'on' ? true : false;

	await Animal.create(req.body);

	res.redirect('/animals');
});

// Edit - GET - Show a form to edit an animal and save the changes
router.get('/:id/edit', async (req, res) => {
	const animal = await Animal.findById(req.params.id);
	res.render('edit.ejs', { animal });
});

//Show - GET -Show individual animal - /animals/:id
router.get('/:id', async (req, res) => {
	const foundAnimal = await Animal.findById(req.params.id);

	res.render('show.ejs', { animal: foundAnimal });
});

// Export the router
module.exports = router