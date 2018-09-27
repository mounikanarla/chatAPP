var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/userdb",{useNewUrlParser:true});
var userSchema=new mongoose.Schema({
    username:String,
    password:String
})

mongoose.connection.on('error', function () {
    console.error('connection error', arguments);
});
mongoose.connection.on('open', function (err) {
    console.log("Connection to mongodb established")
});
module.exports=mongoose.model('user',userSchema);

