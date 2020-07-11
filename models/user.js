const mongoose = require('mongoose');
exports.User = mongoose.model('User' , {
    name:String,
    username:String, 
    password : String ,
   
});
