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
        
        res.render('index.ejs', data); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.get('/login', function (req, res) {
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
    app.get('/signup', function (req, res) {
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
    app.get('/search-travel', isLoggedIn, function (req, res) {
        res.render('search-travel.ejs', {
            logged: true,
            user: req.user,
            title: "search-travel",
            message: "",
            data_departures: ""
        });
    });

    app.post('/search-travel', isLoggedIn, interactions_db.travel, 
        function (req, res) {
        console.log("POST TO /search-travel.")
        console.log(req.body);
               
        var a  = JSON.parse(req.flash('data_departures'))
        //console.log(a)
        res.render('search-travel.ejs', {
            logged: true,
            user: req.user, // get the user out of session and pass to template
            title: "search-travel",
            message: req.flash('updateMessage'),
            data_departures: a
        });
    });



    // =====================================
    // RESERVE =============================
    // =====================================  
    app.get('/reserve', isLoggedIn, function (req, res) {
        res.render('reserve.ejs', {
            logged: true,
            user: req.user,
            title: "Reserve",
            message: ""
        });
    });

    app.post('/reserve', isLoggedIn, interactions_db.reserve,
        function (req, res) {
        console.log("POST TO /reserve.")
        console.log(req.body);
       
        res.render('reserve.ejs', {
            logged: true,
            user: req.user,
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
            user: req.user,
            title: "Dashboard",
            message: ""
        });
    });




    // Users
    app.get('/dashboard/users', isLoggedInAsAdmin, interactions_db.get_users, function (req, res) {

        res.render('dashboard_users.ejs', {
            logged: true,
            user: req.user,
            title: "Overview of users",
            message: "",
            list_user: req.flash('list_user')
        });
    });
    app.post('/dashboard/users/promote', isLoggedInAsAdmin, 
        interactions_db.promote_admin, 
        function (req, res) {
        console.log("POST TO /dashboard/promote.")
        console.log(req.body);
        
        res.redirect('/dashboard/users');
    });



    // Employees
    app.get('/dashboard/employees', isLoggedInAsAdmin, 
        interactions_db.get_ground_employees, 
        interactions_db.get_cabin_crew_employees, 
        interactions_db.get_pilots_employees, 
        function (req, res) {

        res.render('dashboard_employees.ejs', {
            logged: true,
            user: req.user,
            title: "Overview of employees",
            message: req.flash('message'),
            list_ground_employee: req.flash('list_ground_employee'),
            list_cabin_crew_employee: req.flash('list_cabin_crew_employee'),
            list_pilots_employee: req.flash('list_pilots_employee')
        });
    });
    app.post('/dashboard/add/ground-employee', isLoggedInAsAdmin, 
        interactions_db.set_ground_employees,
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/del/ground-employee', isLoggedInAsAdmin, 
        interactions_db.del_ground_employees, 
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/add/cabin-crew-employee', isLoggedInAsAdmin, 
        interactions_db.set_cabin_crew_employees,
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/del/cabin-crew-employee', isLoggedInAsAdmin, 
        interactions_db.del_cabin_crew_employees, 
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/add/pilot-employee', isLoggedInAsAdmin, 
        interactions_db.set_pilots_employees,
        function (req, res) {
            res.redirect('/dashboard/employees');
        });

    app.post('/dashboard/del/pilot-employee', isLoggedInAsAdmin, 
        interactions_db.del_pilots_employees, 
        function (req, res) {
            res.redirect('/dashboard/employees');
        });



    // Aircraft fleet
    app.get('/dashboard/aircrafts-fleet', isLoggedInAsAdmin, interactions_db.get_aircrafts_fleet, 
        function (req, res) {

        res.render('dashboard_aircrafts-fleet.ejs', {
            logged: true,
            user: req.user, 
            title: "Overview of aircrafts_fleet",
            message: "",
            list_aircrafts_fleet: req.flash('list_aircrafts_fleet')
        });
    });



    // Routes
    app.get('/dashboard/routes', isLoggedInAsAdmin, interactions_db.get_routes, 
        function (req, res) {

        res.render('dashboard_routes.ejs', {
            logged: true,
            user: req.user, 
            title: "Overview of routes",
            message: "",
            list_routes: req.flash('list_routes')
        });
    });


    // Airports
    app.get('/dashboard/airports', isLoggedInAsAdmin, interactions_db.get_airports, 
        function (req, res) {

        res.render('dashboard_airports.ejs', {
            logged: true,
            user: req.user, 
            title: "Overview of airports",
            message: "",
            list_airports: req.flash('list_airports')
        });
    });



    // departures
    app.get('/dashboard/departures', isLoggedInAsAdmin, interactions_db.get_departures, 
        function (req, res) {

        res.render('dashboard_departures.ejs', {
            logged: true,
            user: req.user, 
            title: "Overview of departures",
            message: "",
            list_departures: req.flash('list_departures')
        });
    });


    // tickets
    app.get('/dashboard/tickets', isLoggedInAsAdmin, interactions_db.get_tickets, 
        function (req, res) {

        res.render('dashboard_tickets.ejs', {
            logged: true,
            user: req.user, 
            title: "Overview of tickets",
            message: "",
            list_tickets: req.flash('list_tickets')
        });
    });


    // Airports
    app.get('/dashboard/passengers', isLoggedInAsAdmin, interactions_db.get_passengers, 
        function (req, res) {

        res.render('dashboard_passengers.ejs', {
            logged: true,
            user: req.user, 
            title: "Overview of passengers",
            message: "",
            list_passengers: req.flash('list_passengers')
        });
    });


    // Flights
    app.get('/dashboard/flights', isLoggedInAsAdmin, interactions_db.get_flights, 
        function (req, res) {

        res.render('dashboard_flights.ejs', {
            logged: true,
            user: req.user, 
            title: "Overview of planned flights",
            message: "",
            list_flight: req.flash('list_flight')
        });
    });



    // =====================================
    // myreservations ======================
    // =====================================
    app.get('/myreservations', isLoggedIn,
        interactions_db.getMyReservations,
        function (req, res) {

        res.render('myreservations.ejs', {
            logged: true,
            user: req.user,
            title: "My reservations",
            message: "",
            list_reservations: req.flash("list_reservations")
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
