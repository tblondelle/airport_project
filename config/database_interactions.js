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
    
    /*
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

	possible_dates = [start_date]

    connection.query("SELECT flight_number, departure_time, arrival_time, start_day, end_day FROM flights WHERE route_id = ? AND ((start_day = ?) OR (start_day = ?) OR (start_day = ?) OR (start_day = ?) OR (start_day = ?) OR (start_day = ?) OR (start_day = ?))", [route.route_id].concat(possible_dates), function (err, rows) {
        if (err)
            return next()
        console.log(rows[0])
        flight = rows[0]
    });
    */


    req.flash('updateMessage', 'Done!')
	return next()
    
}



// expose this function to our app using module.exports
module.exports.promote_admin = promote_admin;
module.exports.travel = travel;
