const { Pool, Client } = require('pg');


module.exports = { testDb };
module.exports = { insertDb };
// module.exports = { insertDbHighScore };
module.exports = { selectDb };

const pool = new Pool({
  user: "postgres",
  //host: "http://localhost:5432/",
  host: "localhost",
  // database: "PostgreSQLdb",
  database: "Metago",
  password: "parkerWilson01",
  port: 5432
})

//INSERT INTO person (name, country) VALUES ('testerbro','NOR');
//SELECT Name FROM person WHERE id = 1
//pool.query("SELECT * from person", (err,res) => {

//selectDb();

async function insertDb(name, country) {
  const queryStr = "INSERT INTO public.user (id, first_name, country) VALUES ('"+15+"', '"+name+"','"+country+"');";
   pool.query(queryStr, (err, response) => {
    //console.log(err, res);
    console.log("status from DB: ", response);
    pool.end();
    // pool.end(() => {});

  });
}

// async function insertDbHighScore(username, score) {
//   const queryStr = "INSERT INTO public.highscore (gameid, username, score) VALUES ('"+1+"','"+username+"','"+score+"');";
//    pool.query(queryStr, (err, response) => {
//     //console.log(err, res);
//     console.log("status from DB: ", response);
//     pool.end();
//     // pool.end(() => {});

//   });
// }

function selectDb() {
  pool.query("SELECT first_name FROM user", (err, response) => {
    //console.log(err, res);
    console.log(response.rows);
    pool.end();
  });
}




function testDb(name, country)
{



  const queryStr = "INSERT INTO public.user (id, first_name, country) VALUES ('"+19+"', '"+name+"','"+country+"');";
  // const queryStr = "INSERT INTO public.user (first_name, country) VALUES ('"+name+"','"+country+"');";
  pool.query(queryStr, (err, response) => {
   console.log(err, response);
   console.log("status from DB: ", response);
   pool.end();
   // pool.end(() => {});
 });
}


