var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const { default: mongoose } = require("mongoose");
const { Contact } = require("../models/contact");

module.exports = {
    getAllContacts: async(req, res) => {
        const contacts = await Contact.find();
        res.render(
            'contacts.twig', {
                title: "Contact list",
                cont: contacts
            }
        );
    },

    contactForm: (req, res) => {
        res.render(
            'add_contact.twig', {}
        );
    },

    createContact: (req, res) => {
        const contact = new Contact(req.body);
        contact.save((error, element) => {
            if (error) {
                return res.status(400).json({ error })
            }
            res.redirect('/contacts');

        })
    },

    getOneById: (req, res) => {
        res.redirect('/contacts/' + req.body.Identifier);
    },

    getContact: (req, res) => {
        const { id } = req.params;
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Id is not valid')
        }
        Contact.findById(id)
            .then((element) => {
                console.log("element");
                console.log(element);
                if (!element) {
                    return res.status(404).send("Not found")
                }
                res.render(
                    'contacts.twig', {
                        title: "Contact list",
                        cont: [element]
                    }
                );
            }).catch((err) => {
                res.status(400).json(err)
            })
    },

    deleteContact: (req, res) => {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('Id is not valid')
        }

        Contact.findByIdAndRemove(_id, {}, (error, doc) => {
            if (error) {
                return res.status(400).json(error)
            }
            if (!doc) {
                return res.status(404).send("Not found")
            }
            res.redirect('/contacts');
        })
    },

    updateForm: (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Id is not valid')
        }
        Contact.findById(id).then((element) => {
            res.render(
                'update_contact.twig', {
                    element: element
                }
            );
        });
    },

    updateContact: (req, res) => {
        const id = req.params._id;
        const url = req.originalUrl;
        const data = url.split("?")
        const parametres = data[1].split('&');
        console.log(parametres);
        const fullname = parametres[0].split("=")[1];
        console.log(fullname);
        const phone = parametres[1].split("=")[1];
        console.log(phone);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Id is not valid')
        }
        Contact.findByIdAndUpdate(id, { FullName: fullname, Phone: parseInt(phone) }, (error, doc) => {
            if (error) {
                return res.status(400).json(error)
            }
            res.redirect('/contacts');
        })


    },
}