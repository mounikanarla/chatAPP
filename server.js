// importing the express module and storing in the variable express
var express = require("express");
var app = express();
// inorder to pass the json data body-parser is impoted
var bodyParser = require("body-parser");
// importing socket.io for connecting the dashboard and server
var socket= require('socket.io');
// app.use receives a request that json object to use
app.use(bodyParser.json());
// receives a request and defines simple algorithm for parsing 
app.use(bodyParser.urlencoded({ "extended": false }));
// pproviding paths to access the data and storing in variables
var router = require("../chatapp/api/routers/router.js")
var users = require("../chatapp/api/controller/usercontroller.js");
app.use('/', router);
// use the built in middle ware function based on static files
app.use(express.static('./public'))
// it returns the instance of server using the port 5500
var server=app.listen(5500); 
// storing the server value in io
var io=socket(server);
// Receiving the data from the client
io.on('connection', function(client) {
    console.log("user connected");
    client.on('disconnect', function() {
    console.log("disconnected")
    })
    // Receiving the data from the database
    client.on('chatbackend', function(data) {
        users.addingChat(data.userid,data.firstname,data.message,data.dateTime);
        // emitting the added data to the dashboard controller
        io.emit('chatroomClient',data);

    })
});
console.log("Listening to port 5500");
