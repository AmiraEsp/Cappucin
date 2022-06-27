var express = require('express');
var router = express.Router();
var Contact = require('../models/contact')
const contactController = require("../controller/contact.controller");
//list of contacts
router.route('/')
    .get(contactController.getAllContacts);

// afficher le formulaire
router.route('/add')
    .get(contactController.contactForm);

//creer le contact
router.route('/create')
    .post(contactController.createContact);

router.route('/search')
    .post(contactController.getOneById);
router.route('/:id')
    .get(contactController.getContact);

router.route('/delete/:_id')
    .get(contactController.deleteContact);

router.route('/update/:id')
    .get(contactController.updateForm);

router.route('/updateOne/:_id')
    .get(contactController.updateContact);


module.exports = router;