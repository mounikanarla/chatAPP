// Importing userSchema from models
var usermodel = require('../models/userSchema');
var chatmodel = require("../models/chatSchema.js");
var peermodel=require("../models/peerSchema");
var jwt = require('jsonwebtoken');
/*
 * @function: function is used to encript the given argument
 * @param {*} password 
 */
function encrypt(password) {
    var passWord = require('crypto')
        .createHash('sha1')
        .update(password)
        .digest('base64');
    return passWord;
}
/**
 * @function:function is used to define the registration form with two parameters request and result 
 * @param {*} req 
 * @param {*} res 
 */
var registration = function (req, res) {
    try {
        // creating a variable to store response
        var response = {};
        var email = req.body.email;
        // declaring the variable for creating a usermodel for database 
        var db = new usermodel();
        // console.log('email', typeof req.body.email);
        // if the first and last names are not declared then it throw new error
        if (typeof req.body.firstname === 'undefined' || typeof req.body.lastname === 'undefined') {
            throw new Error("Name is required");
        }
        // if email is not declared then it throw new error
        if (typeof req.body.email === 'undefined') {
            throw new Error("Email address is required");
        }
        // if mobile number is not declared then it throw new error
        if (typeof req.body.mobile === 'undefined') {
            throw new Error("mobile number is required");
        }
        // to validate mobile number from 0-9 
        var regex = /^[0-9]+$/;
        if (!regex.test(req.body.mobile)) {
            throw new Error("Enter valid number");
        }
        // to validate email 
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(req.body.email)) {
            throw new Error("Something went wrong in email");
        }
        // validating the first and lastnames
        var re = /^[a-zA-Z]{3,20}\S$/;
        if (!re.test(req.body.firstname) || !re.test(req.body.lastname)) {
            throw new Error("Something went wrong in name");
        }
        // validating the password with some required values
        var re = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
        if (!re.test(req.body.password)) {
            throw new Error("password should contain atleast 8 characters with atleast 1 special charcter,1 numeric,1 Capital and small alphabet");
        }
        // if password is not declared then it throw new error
        if (typeof req.body.password === 'undefined') {
            throw new Error("Password is required ");
        }
        /* A new body object containing the parsed data on the request object after the middleware  
         *  is creating and it is storing in database with some variables
         */
        db.username = req.body.email;
        db.firstname = req.body.firstname;
        db.lastname = req.body.lastname;
        db.email = req.body.email;
        db.password = encrypt(req.body.password);
        db.mobile = req.body.mobile;
        // finding the email instances from the usermodel and declaring the function
        usermodel.find({ "email": email }, function (err, data) {
            // var hashedPassword = bcrypt.hashSync(req.body.password, 8);
            // if the email is not havinfg the data it will send error
            if (err) {
                response = {
                    "error": true, "message": "error", "err": err
                };
                return res.status(404).send(response);
            }
            // if data is present in email it will check the data length
            else {
                // save() will run insert() command of MongoDB.
                // it will add new data in collection.
                if (data.length > 0) {
                    response = { "error": true, "message": "Mail id exist", "err": err };
                    return res.json(response);
                    // return res.status(404).send(response);
                }
                else {
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                    db.save(function (err) {
                        if (err) {

                            response = { "error": true, "message": "erroe Data " };
                        }
                        else {
                            response = { "error": false, "message": "added " };

                        }
                        return res.json(response); //.status(204).send(response);
                    });
                }
            }
        });
        // catcing the errors based on error types
    } catch (e) {
        console.log(e);
        if (e instanceof ReferenceError
            || e instanceof TypeError
            || e instanceof SyntaxError
            || e instanceof RangeError) {
            return res.json({
                "error": true,
                "message": "Something bad happened. Please contact system administrator"
            });
        } else {
            return res.json({
                "error": true,
                "message": e.message
            });
        }
    }
}

/**
 *@function:defining the function for login to check the details for login credentials
 * @param {*} req 
 * @param {*} res 
 */
var login = function (req, res) {
    try {
        // declaring the variable to store response
        var response = {};
        // declaring the variable secret to generate tokens
        var secret = "adcgffghfhgjgjhgfjdgsd34352rtrywrt";
        // finding the email and password wheather it is present in database or not and declaring the function 
        usermodel.find({ "email": req.body.email, "password": encrypt(req.body.password) }, function (err, data) {
            // if the data is not present response is stored as error
            if (err) {
                response = { "error": true, "message": "error" };
                return res.json(response);
            }
            // if data is present ,it will check the data length and it will generate the token for that particular login credentials
            else if (data.length > 0) {
                var token = jwt.sign({ email: req.body.email, password: req.body.password }, secret, { expiresIn: 86400000 }); // expires in 24 hours})
                response = { "error": false, "token": token, "message": "login successful", "firstname": data[0].firstname, "userid": data[0]._id };
                console.log(token);
            }
            // if the login credentials are not present it will declare as invalid
            else {
                response = { "error": true, "message": "invalid login credentials" };
            }
            return res.json(response);

        });
        // catcing the errors based on error types
    } catch (e) {
        console.log(e);
        if (e instanceof ReferenceError
            || e instanceof TypeError
            || e instanceof SyntaxError
            || e instanceof RangeError) {
            return res.json({
                "error": true,
                "message": "Something bad is happened at login page"
            });
        } else {
            return res.json({
                "error": true,
                "message": e.message
            })
        }
    }
}

/**
 * @function : declaring the function userlist in order to display the list of the users
 * @param {*} req 
 * @param {*} res 
 */
var usersList = function (req, res) {
    try {
        // Declaring the variables in order to store the responses
        var response = {};
        var dataArray = [];
        // Returns the value of the parameter with the specified id.
        var userid = req.params.id;
        // console.log(userid);
        // finding the id instances from the usermodel, if the id instance is not equal it is stored in data
        usermodel.find({ "_id": { $ne: userid } }, function (err, data) {
            //  console.log(data);
            // initailizing the for loop, storing the values of firstname,userid and pusing in array
            for (var i = 0; i < data.length; i++) {
                dataArray.push(response = { firstname: data[i].firstname, userid: data[i]._id });
            }
            // if there is no data it prints the response as error
            if (err) {
                response = { "error": true, "message": "Error in data retreiving" };
            }
            // if data is present it will display the data array
            else {
                response = { "error": false, "message": dataArray, "userid": data[0]._id };
            }
            return res.status(200).send(response);
        })
        // catcing the errors based on error types
    } catch (e) {
        console.log(e);
        if (e instanceof ReferenceError
            || e instanceof TypeError
            || e instanceof SyntaxError
            || e instanceof RangeError) {
            return res.json({
                "error": true,
                "message": "Something bad is happened in userslist "
            });
        } else {
            return res.json({
                "error": true,
                "message": e.message
            })
        }
    }
}
/**
 * @function:function is defined to  store messages in database
 * @param {*} req 
 * @param {*} res 
 */

var addingChat = function (userid, firstname, message, dateTime) {
    try {
        // creating variable response to store the data
        var response = {};
        // declaring the variable for creating a chatmodel for database 
        var db = new chatmodel();
        /* A new body object containing the parsed data on the request object after the middleware  
         *  is creating and it is storing in database with some variables
         */
        if (userid === undefined) {
            throw new Error("userid is required ");
        }
        if (firstname === undefined) {
            throw new Error("firstname is required ");
        }
        if(message === undefined)
        {
            throw new Error("message is required")
        }
        if(dateTime === undefined)
        {
            throw new Error("time and date is required")
        }

        db.userid = userid;
        db.firstname = firstname;
        db.message = message;
        db.dateTime = dateTime;
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        db.save(function (err) {
            {
                // if the response is error it will throw error
                if (err) {
                    response = {
                        "error": "false",
                        "message": "error"
                    }
                }
                // if the response is having some data then it is stored in database
                else {
                    response = {
                        "error": true,
                        "message": "message saved into the database"
                    }
                };

                console.log(response);

            }
        })
        // catching the different types of error in catch block
    } catch (e) {

        console.log(e);
        if (e instanceof ReferenceError
            || e instanceof TypeError
            || e instanceof SyntaxError
            || e instanceof RangeError) {
            return res.json({
                "error": true,
                "message": "Something bad is happened at  adding chat"
            });
        } else {
            return res.json({
                "error": true,
                "message": e.message
            })
        }
    }
}
/**
 * @function:function is defined to find the messages from the database
 * @param {*} req 
 * @param {*} res 
 */


var chatlist = function (req, res) {
    try {
        var response = {};
        // finding the messages from the database and defining the function
        chatmodel.find({}, function (err, data) {
            // if the response is error it will throw error
            if (err) {
                response = { "success": "false", "message": "error" }
                return res.status(401).send(response);
            }
            // if the response is having some data then it diplays the messages
            else {
                response = { "success": "true", "message": data }
                return res.status(200).send(response);
            }
        })
        // catching the different types of error in catch block
    } catch (e) {
        console.log(e);
        if (e instanceof ReferenceError
            || e instanceof TypeError
            || e instanceof SyntaxError
            || e instanceof RangeError) {
            return res.json({
                "error": true,
                "message": "Something bad is happened at chatList"
            });
        } else {
            return res.json({
                "error": true,
                "message": e.message
            })
        }
    }
}

/**
 * @function:function is defined to find the messages from the database
 * @param {*} req 
 * @param {*} res 
 */
var peerList = function (userid, recid,firstname, message, dateTime) {
        try {
            // Declaring the variables in order to store the responses
            var response = {};
            var dataArray = [];
            // Returns the value of the parameter with the specified id.
            var userid = req.params.id;
            var recid=req.params.recid;
            // console.log(userid);
            // finding the id instances from the usermodel, if the id instance is not equal it is stored in data
            peermodel.find({ "_id": userid , }, function (err, data) {
                //  console.log(data);
                // initailizing the for loop, storing the values of firstname,userid and pusing in array
                for (var i = 0; i < data.length; i++) {
                    dataArray.push(response = { firstname: data[i].firstname, userid: data[i]._id });
                }
                // if there is no data it prints the response as error
                if (err) {
                    response = { "error": true, "message": "Error in data retreiving" };
                }
                // if data is present it will display the data array
                else {
                    response = { "error": false, "message": dataArray, "userid": data[0]._id };
                }
                return res.status(200).send(response);
            })
            // catcing the errors based on error types
        } catch (e) {
            console.log(e);
            if (e instanceof ReferenceError
                || e instanceof TypeError
                || e instanceof SyntaxError
                || e instanceof RangeError) {
                return res.json({
                    "error": true,
                    "message": "Something bad is happened in userslist "
                });
            } else {
                return res.json({
                    "error": true,
                    "message": e.message
                })
            }
        }
    }
    


}

module.exports = {
    registration: registration,
    login: login,
    usersList: usersList,
    addingChat: addingChat,
    chatlist: chatlist
}
