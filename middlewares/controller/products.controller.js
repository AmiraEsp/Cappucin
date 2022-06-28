var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const { default: mongoose } = require("mongoose");
const { Product } = require("../models/products");

module.exports = {
    getAllProducts: async(req, res) => {
        const products = await Product.find();
        res.render(
            'products.twig', {
                titre: "Liste des produits:",
                produits: products
            }
        );
    },

    productForm: (req, res) => {
        res.render(
            'add_product.twig', {}
        );
    },

    createProduct: async(req, res) => {
        const product = new Product(req.body);
        if (req.file) {
            product.image = req.file.filename;
        }
        product.save((error, element) => {
            if (error) {
                return res.status(400).json({ error })
            }
            res.redirect('/products');
        })
    },

    productDetails: async(req, res) => {
        const { id } = req.params;
        Product.findById(id).then(product => {
            res.render("details.twig", { product })
        }).catch(err => {
            res.json(err);
        });
    },

    deleteProduct: async(req, res) => {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('Id is not valid')
        }

        Product.findByIdAndRemove(_id, {}, (error, doc) => {
            if (error) {
                return res.status(400).json(error)
            }
            if (!doc) {
                return res.status(404).send("Not found")
            }
            res.redirect('/products');
        })
    },
}