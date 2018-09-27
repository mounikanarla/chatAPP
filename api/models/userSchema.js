var mongoose    =   require("mongoose");
//var connect= require('../config/config');
mongoose.connect('mongodb://localhost:27017/userdb',{ useNewUrlParser: true });
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = new mongoSchema({
             'username':{type:String,required:true},
             'firstname'  : {type : String, required: true},
             'lastname'   : {type: String, required: true},
            'email'    : { type: String,  required: true},
            'password'   : {type: String,  required: true},
            // 'conformpassword': {type: String,  required: true},
            'mobile'     : { type: Number, required: true}

            });
// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);