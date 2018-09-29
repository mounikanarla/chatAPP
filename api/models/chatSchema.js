// var mongoose    =   require("mongoose");
// //var connect= require('../config/config');
// mongoose.connect('mongodb://localhost:27017/userdb',{ useNewUrlParser: true });
// // create instance of Schema
// var mongoSchema =   mongoose.Schema;
// // create schema
// var userSchema  = new mongoSchema({
//              'userid':{type:String,required:true},
//              'username':{type:String,required:true},
//              'message'  : {type : String, required: true},
//              'dateTime'   : {type: String, required: true}
// })
// // create model if not exists.
// module.exports = mongoose.model('chatlog',userSchema);