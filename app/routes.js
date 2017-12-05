// app/routes.js



module.exports = function (app, passport) {
    var interactions_db = require('../config/database_interactions');
    
    
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        data = {}
        data.title = "Home";
        if (req.user) {
            data.logged = true;
            data.user = req.user; // get the user out of session and pass to template
        } else {
            data.logged = false;
        }
        
        //console.error(ejsLint('index.ejs', data));
        res.render('index.ejs', data); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {
        // render the page and pass in any flash data if it exists
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('login.ejs', {
                logged: false,
                message: req.flash('loginMessage'),
                title: "Login"
            });
        }
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }),
        function (req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('signup.ejs', {
                logged: false,
                message: req.flash('signupMessage'),
                title: "Signup"
            });
        }
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));




    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)  
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            logged: true,
            user: req.user,
            title: "Profile"
        });
    });




    // =====================================
    // TRAVEL ==============================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)  
    app.get('/travel', isLoggedIn, function (req, res) {
        res.render('travel.ejs', {
            logged: true,
            user: req.user,
            title: "Travel",
            message: ""
        });
    });

    app.use(interactions_db.travel);

    app.post('/travel', isLoggedInAsAdmin, function (req, res) {
        console.log("POST TO /travel.")
        console.log(req.body);
               
        interactions_db.travel;
        
        res.render('travel.ejs', {
            logged: true,
            user: req.user, // get the user out of session and pass to template
            title: "Travel",
            message: req.flash('updateMessage')
        });
    });





    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    // =====================================
    // DASHBOARD ===========================
    // =====================================
    app.get('/dashboard', isLoggedInAsAdmin, function (req, res) {

        res.render('dashboard.ejs', {
            logged: true,
            user: req.user, // get the user out of session and pass to template
            title: "Dashboard",
            message: ""
        });
    });

    app.use(interactions_db.promote_admin);

    app.post('/dashboard', isLoggedInAsAdmin, function (req, res) {
        console.log("POST TO /dashboard.")
        console.log(req.body);
               
        interactions_db.promote_admin;
        
        res.render('dashboard.ejs', {
            logged: true,
            user: req.user, // get the user out of session and pass to template
            title: "Dashboard",
            message: req.flash('updateMessage')
        });
    });


    // =====================================
    // middlewares =========================
    // =====================================

    // route middleware to make sure
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    function isLoggedInAsAdmin(req, res, next) {
        if(req.isAuthenticated() && req.user.is_admin) {
            return next()
        }
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}
