// config/database_interactions.js

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);




//Flights
var get_flights = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM flights", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('list_flight', rows)
        return next()
    });
}

// USERS
var get_users = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM users", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('list_user', rows)
        return next()
    });
}
var promote_admin = function (req, res, next) { // callback with email and password from our form
    var id = req.body.ID;
    connection.query("UPDATE users SET is_admin = 1 WHERE id = ?", [id], function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('updateMessage', 'Done!')
        return next()
    });
}


// Employees
var get_ground_employees = function (req, res, next) {
    connection.query("SELECT * FROM ground_employees", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
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
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('message', surname + ' ' + name +  ' correctly inserted!')
        return next()
    });
}
var del_ground_employees = function (req, res, next) {
    var ground_employees_id = req.body.ground_employees_id;

    connection.query(
        "DELETE FROM ground_employees WHERE ground_employees_id = ?", [ground_employees_id], function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        if (rows.affectedRows == 0) { 
          req.flash('message', 'No such ground employee ID found...')
        } else {
          req.flash('message', 'Ground employee ' + ground_employees_id +  ' deleted!')
        }
        return next()
    });
}

var get_cabin_crew_employees = function (req, res, next) {
    connection.query("SELECT * FROM cabin_crew_employees", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
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
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('message', 'Done!')
        return next()
    });
}
var del_cabin_crew_employees = function (req, res, next) {
    var crew_employees_id = req.body.crew_employees_id;

    connection.query(
        "DELETE FROM cabin_crew_employees WHERE crew_employees_id = ?", [crew_employees_id], function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        if (rows.affectedRows == 0) { 
          req.flash('message', 'No such cabin crew employee ID found...')
        } else {
          req.flash('message', 'Cabin crew employee ' + crew_employees_id +  ' deleted!')
        }
        return next()
    });
}

var get_pilots_employees = function (req, res, next) {
    connection.query("SELECT * FROM pilots_employees", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
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
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('message', 'Done!')
        return next()
    });
}
var del_pilots_employees = function (req, res, next) {
    var pilots_employees_id = req.body.pilots_employees_id;

    connection.query(
        "DELETE FROM pilots_employees WHERE pilots_employees_id = ?", [pilots_employees_id], function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        if (rows.affectedRows == 0) { 
          req.flash('message', 'No such pilot ID found...')
        } else {
          req.flash('message',  " Pilot " + pilots_employees_id + ' deleted!')
        }
        return next()
    });
}

//Aircrafts
var get_aircrafts_fleet = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM aircrafts_fleet", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('list_aircrafts_fleet', rows)
        return next()
    });
}

//Routes
var get_routes = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM routes", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('list_routes', rows)
        return next()
    });
}

// Airports
var get_airports = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM airports", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('list_airports', rows)
        return next()
    });
}

//Departures
var get_departures = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM departures", function (err, rows) {
        if (err)
            return next()
        req.flash('list_departures', rows)
        return next()
    });
}

//Tickets
var get_tickets = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM tickets", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('list_tickets', rows)
        return next()
    });
}

//Passegers
var get_passengers = function (req, res, next) { // callback with email and password from our form
    connection.query("SELECT * FROM passengers", function (err, rows) {
        if (err) {
          req.flash('updateMessage',  'ERROR: ' + err)
          return next()
        }
        req.flash('list_passengers', rows)
        return next()
    });
}


//Reservations
var getMyReservations = function (req, res, next) {
    var user = req.user;

    connection.query(`SELECT 
        tickets.ticket_id,
        tickets.price,
        passengers.surname,
        passengers.name,
        departures.departure_date,
        flights.departure_time,
        flights.arrival_time,
        (SELECT city FROM airports WHERE airports.airport_id = routes.departure_airport_id) AS start_city,
        (SELECT city FROM airports WHERE airports.airport_id = routes.arrival_airport_id) AS end_city,
        aircrafts_fleet.aircraft_type
    FROM 
        tickets 
        LEFT JOIN passengers ON tickets.passenger_id = passengers.passenger_id
        LEFT JOIN departures ON tickets.departure_id = departures.departure_id
        LEFT JOIN flights ON flights.flight_id = departures.flight_id, 
        routes,
        aircrafts_fleet
    WHERE
        user_id = ? AND
        flights.route_id = routes.route_id AND
        aircrafts_fleet.aircraft_id = flights.aircraft_id;`, [user.id], function (err, rows) {
        if (err) {
          console.log("ERR: " + err)
          return next()
        } else {
          if (rows.length == 0) {
            console.log(rows)
            req.flash('list_reservations', "")
          } else {
            console.log(rows)
            req.flash('list_reservations', rows)
          }
          
          return next()
        }
    });
}

// Reserve
var reserve = function (req, res, next) {
    var departure_id = req.body.departure_id;
    var surname = req.body.surname;
    var name = req.body.name;

    if (!departure_id || !surname || !name){
      req.flash('updateMessage', "Please fill all fields...");
      return next()
    }


    var user = req.user;

    var passenger;



    connection.query("SELECT passenger_id FROM passengers WHERE name = ? AND surname = ?", [name, surname], function (err, rows) {
      if (err) console.log("ERR: " + err)

      passenger = rows[0]
      console.log("passenger: " + passenger)
      console.log(rows)

      // Creation of the passenger if needed.
      if (!passenger) {
        console.log("1")
        connection.query("insert into passengers (name, surname) values (?,?)", [name, surname], function (err, rows) {
          if (err) {
            console.log("ERR: " + err)
            return next()
          }

          connection.query("SELECT passenger_id FROM passengers WHERE name = ? AND surname = ?", [name, surname], function (err, rows) {
         
              if (err) {
                console.log("ERR: " + err)
                return next()
              }
              passenger = rows[0]
              makeReservation()
          })
        })
      } else {
        makeReservation()
      }
      

      function makeReservation(){
        
        connection.query("SELECT departure_id, price FROM departures JOIN flights WHERE departure_id = ?", [departure_id], function (err, rows) {
          if (err) console.log("ERR: " + err)

          console.log(rows)
          var departure = rows[0] 

          if (departure == undefined) {
            req.flash('updateMessage', "There is no such departure_id: " + departure_id + ".");
            return next()
          } else {

            connection.query("insert into tickets (price, departure_id, user_id, passenger_id) values (?,?, ?, ?)", [departure.price, departure.departure_id, user.id, passenger.passenger_id], 
              function (err, rows) {
                if (err) {
                  console.log("ERR: " + err)
                  return next()
                }

                connection.query("SELECT departure_id, price FROM tickets JOIN flights WHERE departure_id = ?", [departure_id], function (err, rows) {
                  if (err) console.log("ERR: " + err)
                })



                connection.query("insert into passengers (name, surname, ticket) values (?,?, 8)", [departure.price, departure.departure_id, user.id], 
                  function (err, rows) {
                    if (err)
                      console.log("ERR: " + err)
                      return next()
                    return next()
                  })
                
            });

            // add a taken_seats here
            connection.query("UPDATE departures SET taken_seats = taken_seats + 1 WHERE departure_id = ? ", [departure.departure_id], 
              function (err, rows) {
                if (err) {
                  console.log("ERR: " + err)
                  return next()
                }
            });







            req.flash('updateMessage', "Reservation done for " + surname + " " + name + "!")
          }
        });
      }
  
      

    })
}


// Travel
var travel = function (req, res, next) { // callback with email and password from our form
  var start_city = req.body.start_city; // 'Atlanta'
  var arrival_city = req.body.arrival_city; // 'Paris'
  var input_date = req.body.start_date; // '2017-12-14'

  var airport1, 
  	airport2,
  	route, 
    flight,
    departures = [];

  function parse_date(date_string){
    var year, month, day;
    year = date_string.substring(0, 4);
    month = date_string.substring(5, 7);
    day = date_string.substring(8, 10);
    return [year, month, day];
  }


  // Choose airport 1.
  connection.query("SELECT airport_id, name, code, city FROM airports WHERE city = ?", [start_city], function (err, rows) {
    if (err) {
      console.log("ERR: " + err)
      return next()
    }
    //https://www.w3schools.com/nodejs/nodejs_mysql_select.asp
    /** rows = [
	   * { name: 'John', address: 'Highway 71'},
		 * { name: 'Peter', address: 'Lowstreet 4'},
		 * { name: 'Amy', address: 'Apple st 652'}
		 *   ]
		 **/
    airport1 = rows[0] // First line of the table requested.

    if (airport1 == undefined) {
      req.flash('data_departures', "{}");
      req.flash('updateMessage', "There is no such city: " + start_city + ".");
      return next()
    } else {
      //console.log('start city found');
      // Find airport 2.
      connection.query("SELECT airport_id, name, code, city FROM airports WHERE city = ?", [arrival_city], function (err, rows) {
        if (err) {
          console.log("ERR: " + err);
          return next();
        }

        airport2 = rows[0]

        if (airport2 == undefined) {
          req.flash('data_departures', "{}");
          req.flash('updateMessage', "There is no such city: " + arrival_city + ".");
          return next()
        } else {
          //console.log('end city found');
          // Find route from airport 1 to airport 2.
          connection.query("SELECT route_id FROM routes WHERE departure_airport_id = ? AND arrival_airport_id = ?", [airport1.airport_id, airport2.airport_id], function (err, rows) {
            if (err) {
              console.log("ERR: " + err);
              return next();
            }

            route = rows[0]

            if (route == undefined) {
              req.flash('data_departures', "{}");
              req.flash('updateMessage', "There is no such route from " + start_city + " and " + arrival_city + ".");
              return next()
            } else {
              //console.log('route found: ' + route.route_id);
              connection.query("SELECT * FROM flights WHERE route_id = ?", [route.route_id], function (err, rows) {
                if (err) {
                  console.log("ERR: " + err);
                  return next();
                }

                flight = rows[0]

                if (flight == undefined) {
                  req.flash('data_departures', "{}");
                  req.flash('updateMessage', "There is no flight from " + start_city + " to " + arrival_city + ".");
                  return next()
                }  else {

                  // the flight exist.
                  // Now the question is : est-ce qu'il y a une date de prévue intéressante, et est-ce qu'il y a encore de la place ?
                  connection.query("SELECT * FROM departures WHERE flight_id = ?", [flight.flight_id], function (err, rows) {
                    if (err) {
                      console.log("ERR: " + err);
                      return next();
                    }

                    var departures_temp = rows;
                    if (departures_temp == undefined) {
                      req.flash('data_departures', "{}");
                      req.flash('updateMessage', "There is no departure for the flight " + flight.flight_id + " (" + start_city + " to " + arrival_city + ").");
                      return next()
                    } else {

                      // Add interesting departures.
                      for (i in departures_temp) {
                        var departure_temp = departures_temp[i];
                        var start_date = new Date(departure_temp["departure_date"]);
                        start_date.setHours(start_date.getHours()+1); // Get the time in France
                        input_date = new Date(input_date)

                        if (input_date <= start_date) { // If the dates matches
                          if (departure_temp.taken_seats < departure_temp.aircraft_capacity){
                            departures.push(departure_temp)
                          }
                        }
                      }

                      var data_departures = {}
                      data_departures.airport1 = airport1; // attributes: airport_id, name, code, city 
                      data_departures.airport2 = airport2; // attributes: airport_id, name, code, city 
                      data_departures.flight = flight; // attributes: flight_id, departure_time, arrival_time, start_day, end_day, aircraft_id, route_id, price
                      data_departures.departures = departures; // list of object attributes:  departure_id, flight_id, departure_date, pilot_1, pilot_2, crew_1, crew_2, aircraft_capacity, taken_seats

                      req.flash('data_departures', JSON.stringify(data_departures));
                      req.flash('updateMessage', "There are " + departures.length + " departures for this flight!")
                      return next()
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}



// expose this function to our app using module.exports
module.exports.get_flights = get_flights;

module.exports.get_users = get_users;
module.exports.promote_admin = promote_admin;


module.exports.get_ground_employees = get_ground_employees;
module.exports.get_cabin_crew_employees = get_cabin_crew_employees;
module.exports.get_pilots_employees = get_pilots_employees;
module.exports.set_ground_employees = set_ground_employees;
module.exports.set_cabin_crew_employees = set_cabin_crew_employees;
module.exports.set_pilots_employees = set_pilots_employees;
module.exports.del_ground_employees = del_ground_employees;
module.exports.del_cabin_crew_employees = del_cabin_crew_employees;
module.exports.del_pilots_employees = del_pilots_employees;

module.exports.get_aircrafts_fleet = get_aircrafts_fleet;
module.exports.get_routes = get_routes;
module.exports.get_airports = get_airports;
module.exports.get_departures = get_departures;
module.exports.get_tickets = get_tickets;
module.exports.get_passengers = get_passengers;

module.exports.travel = travel;
module.exports.reserve = reserve;
module.exports.getMyReservations = getMyReservations;
