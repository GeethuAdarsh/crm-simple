const mongoose = require('mongoose');
exports.EnquirySchema = new  mongoose.Schema({
    name:String,
    phone:String, 
    email : String ,
    note : String ,
    status : String, 
    created_BY: {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{timestamps:true} );

exports.Enquiry = mongoose.model('Enquiry',this.EnquirySchema);