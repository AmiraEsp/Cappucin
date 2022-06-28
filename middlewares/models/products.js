const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product_schema = new
Schema({
    name: String,
    image: String
});
const Product = mongoose.model('products', Product_schema);
module.exports = { Product }