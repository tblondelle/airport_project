// config/database_interactions.js

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


var get_flights = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM flights", function (err, rows) {
        if (err)
            return next()
        req.flash('list_flight', rows)
        return next()
    });
}

var get_users = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM users", function (err, rows) {
        if (err)
            return next()
        req.flash('list_user', rows)
        return next()
    });
}

var get_ground_employees = function (req, res, next) {
    connection.query("SELECT * FROM ground_employees", function (err, rows) {
        if (err)
            return next()
        req.flash('list_ground_employee', rows)
        return next()
    });
}
var set_ground_employees = function (req, res, next) {
    var surname = req.body.surname;
    var name = req.body.name;
    var address = req.body.address;
    var wage = req.body.wage;
    var post = req.body.post;
    var social_security_number = req.body.social_security_number;

    connection.query(
        "INSERT INTO ground_employees (surname, name, address, wage, post, social_security_number) values (?, ?, ?, ?,?,?)", [surname, name, address, wage, post, social_security_number], function (err, rows) {
        if (err)
            return next()
        req.flash('updateMessage', surname + ' ' + name +  ' correctly inserted!')
        return next()
    });
}
var del_ground_employees = function (req, res, next) {
    var ground_employees_id = req.body.ground_employees_id;
    console.log("oui")

    connection.query(
        "DELETE FROM ground_employees WHERE ground_employees_id = ?", [ground_employees_id], function (err, rows) {
        if (err)
            return next()
        req.flash('updateMessage', 'Ground employee ' + ground_employees_id +  ' deleted!')
        return next()
    });
}


var get_cabin_crew_employees = function (req, res, next) {
    connection.query("SELECT * FROM cabin_crew_employees", function (err, rows) {
        if (err)
            return next()
        req.flash('list_cabin_crew_employee', rows)
        return next()
    });
}
var set_cabin_crew_employees = function (req, res, next) {
    var surname = req.body.surname;
    var name = req.body.name;
    var address = req.body.address;
    var wage = req.body.wage;
    var post = req.body.post;
    var flight_hours = req.body.flight_hours;
    var social_security_number = req.body.social_security_number;
    console.log(surname,name, address, wage, post, flight_hours, social_security_number)

    connection.query(
        "INSERT INTO cabin_crew_employees (surname, name, address, wage, post, flight_hours, social_security_number) values (?, ?, ?, ?, ?,?,?)", [surname, name, address, wage, post, flight_hours, social_security_number], function (err, rows) {
        if (err)
            req.flash('updateMessage', 'ERROR!')
            return next()
        req.flash('updateMessage', 'Done!')
        return next()
    });
}
var del_cabin_crew_employees = function (req, res, next) {
    var crew_employees_id = req.body.crew_employees_id;

    connection.query(
        "DELETE FROM cabin_crew_employees WHERE crew_employees_id = ?", [crew_employees_id], function (err, rows) {
        if (err)
            return next()
        req.flash('updateMessage', 'Cabin crew employee ' + crew_employees_id +  ' deleted!')
        return next()
    });
}


var get_pilots_employees = function (req, res, next) {
    connection.query("SELECT * FROM pilots_employees", function (err, rows) {
        if (err)
            return next()
        req.flash('list_pilots_employee', rows)
        return next()
    });
}
var set_pilots_employees = function (req, res, next) {
    var surname = req.body.surname;
    var name = req.body.name;
    var address = req.body.address;
    var wage = req.body.wage;
    var flight_hours = req.body.flight_hours;
    var flight_licence = req.body.flight_licence;
    var social_security_number = req.body.social_security_number;

    connection.query(
        "INSERT INTO pilots_employees (surname, name, address, wage, flight_hours, flight_licence, social_security_number) values (?,?,?, ?,?,?, ?)", [surname, name, address, wage, flight_hours, flight_licence, social_security_number], function (err, rows) {
        if (err)
            console.log("ERROR:" + err);
            return next()
        req.flash('updateMessage', 'Done!')
        return next()
    });
}
var del_pilots_employees = function (req, res, next) {
    var pilots_employees_id = req.body.pilots_employees_id;

    connection.query(
        "DELETE FROM pilots_employees WHERE pilots_employees_id = ?", [pilots_employees_id], function (err, rows) {
        if (err)
            req.flash('updateMessage',  'ERROR: ' + err)
            return next()
        req.flash('updateMessage',  " Pilot " + pilots_employees_id + ' deleted!')
        return next()
    });
}


var get_aircrafts_fleet = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM aircrafts_fleet", function (err, rows) {
        if (err)
            return next()
        req.flash('list_aircrafts_fleet', rows)
        return next()
    });
}


var get_routes = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM routes", function (err, rows) {
        if (err)
            return next()
        req.flash('list_routes', rows)
        return next()
    });
}


var get_airports = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM airports", function (err, rows) {
        if (err)
            return next()
        req.flash('list_airports', rows)
        return next()
    });
}


var get_departures = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM departures", function (err, rows) {
        if (err)
            return next()
        req.flash('list_departures', rows)
        return next()
    });
}

var get_tickets = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM tickets", function (err, rows) {
        if (err)
            return next()
        req.flash('list_tickets', rows)
        return next()
    });
}

var get_passengers = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM passengers", function (err, rows) {
        if (err)
            return next()
        req.flash('list_passengers', rows)
        return next()
    });
}


var travel = function (req, res, next) { // callback with email and password from our form
    var start_city = req.body.start_city; // 'Mexico'
    var arrival_city = req.body.arrival_city; // 'Paris'
    var start_week = req.body.start_date; // '2017-12-14'

    var airport1, 
    	airport2,
    	route;

    // Choose airport 1.
    connection.query("SELECT airport_id, name, code, city FROM airports WHERE city = ?", [start_city], function (err, rows) {
        if (err)
            return next()
        //https://www.w3schools.com/nodejs/nodejs_mysql_select.asp
        /** rows = [
		 * { name: 'John', address: 'Highway 71'},
  		 * { name: 'Peter', address: 'Lowstreet 4'},
  		 * { name: 'Amy', address: 'Apple st 652'}
  		 *   ]
  		 **/
        console.log(rows[0])
        airport1 = rows[0]
    });
    
    // Find airport 2.
    connection.query("SELECT airport_id, name, code, city FROM airports WHERE city = ?", [arrival_city], function (err, rows) {
        if (err)
            return next()
        console.log(rows[0])
        airport2 = rows[0]
    });
    
    
    // Find route from airport 1 to airport 2.
    connection.query("SELECT route_id FROM routes WHERE departure_airport_id = ? AND arrival_airport_id = ?", [airport1.airport_id, airport2.airport_id], function (err, rows) {
        if (err)
            return next()
        console.log(rows[0])
        route = rows[0]
    });
	

	// Find the flight for route.


	function parse_date(date_string){
		var year, month, day;
		year = date_string.substring(0, 4);
		month = date_string.substring(5, 7);
		day = date_string.substring(8, 10);
		return [year, month, day];
	}

	var possible_dates = [start_week]
    console.log(possible_dates)

    
    connection.query("SELECT flight_number, departure_time, arrival_time, start_day, end_day FROM flights WHERE route_id = ? AND ((start_day = ?) OR (start_day = ?) OR (start_day = ?) OR (start_day = ?) OR (start_day = ?) OR (start_day = ?) OR (start_day = ?))", [route.route_id].concat(possible_dates), function (err, rows) {
        if (err)
            return next()
        console.log(rows[0])
        flight = rows[0]
    });
    


    req.flash('updateMessage', 'Done!')
	return next()
    
}



// expose this function to our app using module.exports
module.exports.promote_admin = promote_admin;
module.exports.get_flights = get_flights;
module.exports.get_users = get_users;
module.exports.get_ground_employees = get_ground_employees;
module.exports.get_cabin_crew_employees = get_cabin_crew_employees;
module.exports.get_pilots_employees = get_pilots_employees;
module.exports.get_aircrafts_fleet = get_aircrafts_fleet;
module.exports.get_routes = get_routes;
module.exports.get_airports = get_airports;
module.exports.get_departures = get_departures;
module.exports.get_tickets = get_tickets;
module.exports.get_passengers = get_passengers;

module.exports.set_ground_employees = set_ground_employees;
module.exports.set_cabin_crew_employees = set_cabin_crew_employees;
module.exports.set_pilots_employees = set_pilots_employees;

module.exports.del_ground_employees = del_ground_employees;
module.exports.del_cabin_crew_employees = del_cabin_crew_employees;
module.exports.del_pilots_employees = del_pilots_employees;



module.exports.travel = travel;
