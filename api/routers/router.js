// importing the express module and storing in the variable express
var express = require('express');
// importing the express.Router for creating specific middleware and storing in variable router
var router = express.Router();
var app = express();
var users = require("../controller/usercontroller");
// console.log("users",users.registration);
var authroute = require("../routers/authroute");
router.post("/login", users.login);
router.post('/register', users.registration);
// router.get('/:id/list',users.usersList);
// ConnectDB();
// when router receives a request function is executed
router.use('/auth', authroute);
// when app receives a request function is executed
app.use('/', router);

module.exports = router;