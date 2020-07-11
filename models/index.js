const mongoose = require('mongoose');
const { User } = require('./user');
const { Enquiry } = require('./enquiry');

mongoose.connect('mongodb://localhost:27017/simple_crm_server',{useNewUrlParser:true});

module.exports = {
    User,
    Enquiry
}