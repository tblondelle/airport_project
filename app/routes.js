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
        // render the page and pass in any flash data if it exist.
        
        console.log("requete user")
        console.log(req.user)
        console.log("requete session")
        console.log(req.session)

        if (req.user) {
            res.redirect('/profile');
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
            failureFlash: true })
    );

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

    app.post('/travel', isLoggedIn, interactions_db.travel, 
        function (req, res) {
        console.log("POST TO /travel.")
        console.log(req.body);
               
        
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



    app.get('/dashboard', function (req, res) {

        res.render('dashboard.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Dashboard",
            message: ""
        });
    });



    app.get('/dashboard/promote', isLoggedInAsAdmin, function (req, res) {

        res.render('dashboard_promote.ejs', {
            logged: true,
            user: req.user, // get the user out of session and pass to template
            title: "Dashboard - promote",
            message: ""
        });
    });

    app.post('/dashboard/promote', isLoggedInAsAdmin, 
        interactions_db.promote_admin, 
        function (req, res) {
        console.log("POST TO /dashboard/promote.")
        console.log(req.body);
        
        res.render('dashboard_promote.ejs', {
            logged: true,
            user: req.user, // get the user out of session and pass to template
            title: "Dashboard - promote",
            message: req.flash('updateMessage')
        });
    });





    // Users
    app.get('/dashboard/users', interactions_db.get_users, function (req, res) {

        res.render('dashboard_users.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Overview of users",
            message: "",
            list_user: req.flash('list_user')
        });
    });



    // Employees
    app.get('/dashboard/employees', 
        interactions_db.get_ground_employees, 
        interactions_db.get_cabin_crew_employees, 
        interactions_db.get_pilots_employees, 
        function (req, res) {


        res.render('dashboard_employees.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Overview of employees",
            message: req.flash('updateMessage'),
            list_ground_employee: req.flash('list_ground_employee'),
            list_cabin_crew_employee: req.flash('list_cabin_crew_employee'),
            list_pilots_employee: req.flash('list_pilots_employee')
        });
    });
    app.post('/dashboard/add/ground-employee', 
        interactions_db.set_ground_employees,
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/del/ground-employee', 
        interactions_db.del_ground_employees, 
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/add/cabin-crew-employee', 
        interactions_db.set_cabin_crew_employees,
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/del/cabin-crew-employee', 
        interactions_db.del_cabin_crew_employees, 
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/add/pilot-employee', 
        interactions_db.set_pilots_employees,
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/del/pilot-employee', 
        interactions_db.del_pilots_employees, 
        function (req, res) {
            res.redirect('/dashboard/employees');
        });



    // Aircraft fleet
    app.get('/dashboard/aircrafts-fleet', interactions_db.get_aircrafts_fleet, 
        function (req, res) {

        res.render('dashboard_aircrafts-fleet.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Overview of aircrafts_fleet",
            message: "",
            list_aircrafts_fleet: req.flash('list_aircrafts_fleet')
        });
    });



    // Routes
    app.get('/dashboard/routes', interactions_db.get_routes, 
        function (req, res) {

        res.render('dashboard_routes.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Overview of routes",
            message: "",
            list_routes: req.flash('list_routes')
        });
    });


    // Airports
    app.get('/dashboard/airports', interactions_db.get_airports, 
        function (req, res) {

        res.render('dashboard_airports.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Overview of airports",
            message: "",
            list_airports: req.flash('list_airports')
        });
    });



    // departures
    app.get('/dashboard/departures', interactions_db.get_departures, 
        function (req, res) {

        res.render('dashboard_departures.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Overview of departures",
            message: "",
            list_departures: req.flash('list_departures')
        });
    });


    // tickets
    app.get('/dashboard/tickets', interactions_db.get_tickets, 
        function (req, res) {

        res.render('dashboard_tickets.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Overview of tickets",
            message: "",
            list_tickets: req.flash('list_tickets')
        });
    });


    // Airports
    app.get('/dashboard/passengers', interactions_db.get_passengers, 
        function (req, res) {

        res.render('dashboard_passengers.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Overview of passengers",
            message: "",
            list_passengers: req.flash('list_passengers')
        });
    });


    // Flights
    app.get('/dashboard/flights', interactions_db.get_flights, 
        function (req, res) {


        res.render('dashboard_flights.ejs', {
            logged: false,
            user: req.user, // get the user out of session and pass to template
            title: "Overview of planned flights",
            message: "",
            list_flight: req.flash('list_flight')
        });
    });




    // =====================================
    // middlewares =========================
    // =====================================

    // route middleware to make sure
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) return next();

        // if they aren't, redirect them to the home page
        res.redirect('/');
    }

    function isLoggedInAsAdmin(req, res, next) {
        if(req.isAuthenticated() && req.user.is_admin) return next()

        // if they aren't, redirect them to the home page
        res.redirect('/');
    }
}
