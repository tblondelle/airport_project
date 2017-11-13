var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  
});

connection.connect();

connection.query("USE airport", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

connection.end();

console.log('ee');
