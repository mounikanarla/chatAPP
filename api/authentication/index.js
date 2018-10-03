// In order to access tokens for authentication from server,importing the jwt
var jwt = require('jsonwebtoken');
// in order to generate a token we are declaring secret variable with some values
var secret = "adcgffghfhgjgjhgfjdgsd34352rtrywrt";
// creating a middleware function with HTTP response argument,request argument and a callback argument
var auth = function (req, res, next) {

    // declaring a variable token An object containing custom header given in the current request.
    var token = req.headers["token"];
    var response = {
        'message': "Unauthorised Entry "
    };
    // console.log("in auth ", token);
    // Asynchronously verify given token using a secret to get a decoded token
    jwt.verify(token, secret, function (err, decodedData) {
        // if the error is present it will send the response as error
        if (err) {
            console.log(err)
            return res.status(401).send(response);
        }
        // if the verified token is correct it display the decoded data and go to next callback function
        else {
            console.log(decodedData);
            next();
        }
    });
    //next();
}
module.exports = auth;

