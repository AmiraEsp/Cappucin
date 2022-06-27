var express = require('express');
var router = express.Router();
var fs = require('fs');

let products_file = fs.readFileSync('./public/data/products.json');
let products_list = JSON.parse(products_file);

router.get('/', function(req, res, next) {
    res.json(products_list);
});


router.get('/:id', function(req, res, next) {
    res.json(products_list[req.params.id]);
});

router.get('/:id/:qt', function(req, res, next) {
    product = products_list[req.params.id]
    if (product)
        res.json({
            id: req.params.id,
            qt: req.params.qt,
            unit_price: product.price,
            total_price: req.params.qt * product.price
        });
    else
        res.json({
            resultat: "product does not exist"
        });
});


router.get('/products/instock/:qt', function(req, res, next) {
    const products = [];

    for (var [key, value] of Object.entries(productList)) {
        if (value.stock >= req.params.qt) {
            products.push(value);
        }
    }
    res.json(products)
});

module.exports = router;