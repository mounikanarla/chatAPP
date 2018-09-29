
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var socket= require('socket.io');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

var router = require("../chatapp/api/routers/router.js")
app.use('/', router);
app.use(express.static('./public'))
var server=app.listen(5500);
var io=socket(server);
io.on('connection', function(client) {
    client.on('disconnect', function() {
    console.log("disconnected")
    });
    client.on('chatbackend', function(data) {
        client.join(data.roomId);
        console.log(' Client joined the room and client id is '+ client.id);

    });
});
console.log("Listening to port 5500");
