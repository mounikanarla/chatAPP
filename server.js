
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var socket= require('socket.io');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

var router = require("../chatapp/api/routers/router.js")
var users = require("../chatapp/api/controller/usercontroller.js");
app.use('/', router);
app.use(express.static('./public'))
var server=app.listen(5500);
var io=socket(server);
io.on('connection', function(client) {
    console.log("user connected");
    client.on('disconnect', function() {
    console.log("disconnected")
    })
    client.on('chatbackend', function(data) {
        users.addingChat(data.userid,data.firstname,data.message,data.dateTime);
        console.log("hii")
        io.emit('chatroomClient',data);

    })
});
console.log("Listening to port 5500");
