// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function (err, rows) {
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, username, password, done) {

                connection.query("SELECT * FROM users", function (err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length === 0) {
                        // if there is no user,
                        // this first new user is an admin.
                        var newUserMysql = {
                            username: username,
                            is_admin: 1,
                            password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
                        };

                        var insertQuery = "INSERT INTO users ( username, is_admin, password ) values (?,?,?)";

                        connection.query(insertQuery, [newUserMysql.username, newUserMysql.is_admin, newUserMysql.password], function (err, rows) {
                            newUserMysql.id = rows.insertId;

                            return done(null, newUserMysql);
                        });
                    } else {
                        // find a user whose email is the same as the forms email
                        // we are checking to see if the user trying to login already exists
                        connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
                            if (err)
                                return done(err);
                            if (rows.length > 0) {
                                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                            } else {
                                // if there is no user with that username
                                // create the user
                                var newUserMysql = {
                                    username: username,
                                    is_admin: 0,
                                    password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
                                };

                                var insertQuery = "INSERT INTO users ( username, is_admin, password ) values (?,?,?)";

                                connection.query(insertQuery, [newUserMysql.username, newUserMysql.is_admin, newUserMysql.password], function (err, rows) {
                                    newUserMysql.id = rows.insertId;

                                    return done(null, newUserMysql);
                                });
                            }
                        });
                    }
                });


            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, username, password, done) { // callback with email and password from our form
                connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No such username: ' + username + ".")); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, rows[0]);
                });
            })
    );

};
