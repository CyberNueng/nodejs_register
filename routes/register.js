var express = require('express');
var routes = express.Router();
var userDB = require('../controllers/user.js');

routes.post('/regis', (req, res, next) => { //register //complete test
    var newuser = {
        email: req.body.email,
        pass: req.body.pass,
        arrayOb: req.body.sdg
    }
    userDB.addNormUser(newuser, (err, aExist) => {
        if (err) {return res.json({ success: false, meg: 'Error' });}
        else if(aExist) {return res.json({ success: false, meg: 'User is already exist' });}
        else {return res.json({ success: true, meg: 'registered' });}
    });
});

module.exports = routes;