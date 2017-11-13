// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
        console.log(1);
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
        console.log(2);
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/start', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("3");

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
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
        console.log(4);
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/start', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

    
    
    
    
    // =====================================
	// ADMIN LOGIN =========================
	// =====================================
	// show the login form
	app.get('/adminlogin', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('adminlogin.ejs', { message: req.flash('adminloginMessage') });
        console.log(5);
	});

	// process the login form
	app.post('/adminlogin', passport.authenticate('local-adminlogin', {
            successRedirect : '/adminstart', // redirect to the secure profile section
            failureRedirect : '/adminlogin', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("6");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// ADMIN SIGNUP ========================
	// =====================================
	// show the signup form
	app.get('/adminsignup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('adminsignup.ejs', { message: req.flash('signupMessage') });
        console.log(7);
	});

	// process the signup form
	app.post('/adminsignup', passport.authenticate('local-adminsignup', {
		successRedirect : '/adminstart', // redirect to the secure profile section
		failureRedirect : '/adminsignup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
    
    
    
    
    
    
    
    
	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/adminstart', isLoggedIn, function(req, res) {
        console.log(8);
		res.render('adminstart.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

    
    app.get('/start', isLoggedIn, function(req, res) {
        console.log("8bis");
		res.render('start.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
    
    
    
    
    
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
    console.log(9);
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
