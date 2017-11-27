// config/database_modif.js

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);


var promote_admin = function (req, res, next) { // callback with email and password from our form
    var username = req.body.username;
    connection.query("UPDATE users SET is_admin = 1 WHERE username = ?", [username], function (err, rows) {
        if (err)
            return next()
        req.flash('updateMessage', 'Done!')
        return next()
    });
}


// expose this function to our app using module.exports
module.exports.promote_admin = promote_admin;
