var express = require('express');
var router = express.Router();
var Product = require('../models/products')
const productController = require("../controller/products.controller");


const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, +(new Date()) + "-" + file.originalname);
    }
})

const upload = multer({ storage });

router.get('/', productController.getAllProducts);
router.get('/add', productController.productForm);
router.post('/create', upload.single('tumbnail'), productController.createProduct);
router.get('/view/:id', productController.productDetails);
router.get('/delete/:_id', productController.deleteProduct);


module.exports = router;