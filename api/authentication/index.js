var jwt = require('jsonwebtoken');
var secret = "adcgffghfhgjgjhgfjdgsd34352rtrywrt";
var auth = function (req, res, next) {

    //next();
    var token = req.headers["token"];
    var response = {
        'message': "Unauthorised Entry "
    };
    // console.log("in auth ", token);
    jwt.verify(token, secret, function (err, decodedData) {
        if (err) {
            console.log(err)
            return res.status(401).send(response);
        }
        else {
            console.log(decodedData);
            next();
        }
    });
    //next();
}
module.exports = auth;

