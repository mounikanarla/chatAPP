// importing the express module and storing in the variable express
var express = require('express');
// importing the express.Router for creating specific middleware and storing in variable router
var router = express.Router();
// declaring the paths to get the data fronm the database
var users = require('../controller/usercontroller');
var auth = require('../authentication');
// getting the values from the database
router.get('/users/:id/list', auth, users.usersList);
router.get('/chatlist', auth, users.chatlist);
router.get('/peerchatlist/:userid/and/:receiverid',auth,users.peerchatlist);
module.exports = router