const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Contact_schema = new
Schema({
    FullName: String,
    Phone: Number
});
const Contact = mongoose.model('contacts', Contact_schema);
module.exports = { Contact }