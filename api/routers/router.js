var express= require('express');
var router=express.Router();
var app = express();
var users=require("../controller/usercontroller");
// console.log("users",users.registration);
var authroute=require("../routers/authroute");
router.post("/login", users.login);
router.post('/register', users.registration);
// router.get('/:id/list',users.usersList);
// ConnectDB();
router.use('/auth', authroute);    
 app.use('/', router);

module.exports=router;