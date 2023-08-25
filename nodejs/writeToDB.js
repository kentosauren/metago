let mysql = require('mysql');
let connection = mysql.createConnection({
  host: "http://localhost:5432/",
  user: "postgres",
  password: "parkerWilson01",
  database: "PostgreSQLdb"
});

console.log('running');
// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  let createTodos = `create table if not exists todos(
                          id int primary key auto_increment,
                          title varchar(255)not null,
                          completed tinyint(1) not null default 0
                      )`;

  connection.query(createTodos, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
});

console.log('running done');





// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "sql11.freesqldatabase.com",
//   user: "sql11528340",
//   password: "AbMeeAHCzA",
//   database: "3306"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });