// import { ChatGPT } from 'chatgpt';

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');//this is for parsing data in the contact form


const app = express();
const db = require("./nodejs/dbActions");



app.listen(3000, () => console.log('app available on http://localhost:3000'));

app.use(express.static('public'));
app.use(express.json({limit: '1mb' }));

app.use(bodyParser.urlencoded({ extended: false }));//this is for parsing data in the contact form
// //const ChatGPT = require('chatgpt');
// const chatgpt = new ChatGPT('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');

// // You can now use the chatsgpt object to call the various methods of the ChatGPT API. For example, to generate text based on a prompt, you can use the generate method like this:
// chatgpt.generate({
//     prompt: 'What is your favorite color?',
//     maxTokens: 128
//   }).then(response => {
//     console.log(response.text);
//   });




//EMAIL START-----------------------------------------------------------------------
app.post('/send-email', (req, res) => {
    // get the form data from the request body
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
  
    // create the transporter object using nodemailer
    const transporter = nodemailer.createTransport({
    //   service: 'gmail',
      service: 'office365',
      port: 587,
      auth: {
        //gmail
        // user: 'kentosauren@gmail.com',
        // pass: 'lqmtsafncepnefem'

        //office
        // user: 'kent@metabro.no',
        user: 'metabroMail',
        pass: 'bvrgydrsgggdlsgr'
      }
    });
  
    // create the email options
    const mailOptions = {
    //   from: 'kent@gmail.com',
    from: 'kent@metabro.no',
      to: 'kent@metabro.no',
      subject: `Message from ${name}`,
      html: `<h1>Hello!</h1><p>You have received a message from ${name} (${email}):</p><p>${message}</p>`
    };
  
    // send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent');
      }
    });
  });

  //EMAIL END-----------------------------------------------------------------------
  
app.post('/api', (request, response) =>{
    console.log("The server  received a request");
    console.log(request.body);

    db.insertDb(request.body.name, request.body.country);
    
    //this gets returned to client in 'then'-method in fetch
    response.json({
        status: 'Success',
    });
});

app.post('/pay', (req, res) => {
    // Extract the Vipps phone number and item price from the request body
    const vippsPhone = req.body['vipps-phone'];
    const itemPrice = req.body['item-price'];
  
    // Use the Vipps API client to initiate a payment with the specified details
    vipps.initiatePayment({
      phone: vippsPhone,
      amount: itemPrice,
    })
      .then(paymentResponse => {
        // The payment has been initiated successfully, redirect the user to the Vipps payment page
        res.redirect(paymentResponse.url);
      })
      .catch(error => {
        // There was an error initiating the payment, handle the error
        // For example, you might display an error message to the user
        res.send(`An error occurred: ${error.message}`);
      });
  });
  

app.get('/getHighscore', (request, response12) =>{
    const pool = initDbPool();
    const queryStr = "SELECT * FROM public.highscore order by score desc LIMIT 23";

    pool.query(queryStr, (err, response) => {
        response12.json(response);
        pool.end();
    });
});

app.post('/nodeSetDbHighScore', (request, response) =>{
    console.log("The server received a request");
    console.log(request.body);
    if(request.body.username != '' && request.body.scoreCounter != '')
    {
        // db.insertDb(request.body.name, request.body.country);
        setHighScore(request.body.username, request.body.scoreCounter, request.body.gameid);
        response.json({
            status: 'Success',
        });
    }
    else
        console.log('enter textfields');
    //this gets returned to client in 'then'-method in fetch
});



function setHighScore(username, score, gameid)
{
    const pool = initDbPool();

    const queryStr = "INSERT INTO public.highscore (username, score, gameid) VALUES ('" + username + "','" + score + "','" + gameid + "');";
    //const queryStr = "INSERT INTO public.user (first_name, country) VALUES ('"+name+"','"+country+"');";
    pool.query(queryStr, (err, response) => {
        console.log(err, response);
        console.log("status from DB: ", response);
        pool.end();
        // pool.end(() => {});
    });
}

app.post('/dbSet', (request, response) =>{
    console.log("The server received a request");
    console.log(request.body);
    if(request.body.country != '' && request.body.name != '')
    {
        // db.insertDb(request.body.name, request.body.country);
        testDb(request.body.name, request.body.country);
        response.json({
            status: 'Success',
        });
    }
    else
        console.log('enter textfields');
    //this gets returned to client in 'then'-method in fetch
});

function testDb(name, country)
{

const { Pool, Client } = require('pg');

const pool = new Pool({
    user: "postgres",
    //host: "http://localhost:5432/",
    host: "localhost",
    // database: "PostgreSQLdb",
    database: "Metago",
    password: "parkerWilson01",
    port: 5432
  });
  

   const queryStr = "INSERT INTO public.user (id, first_name, country) VALUES ('"+18+"', '"+name+"','"+country+"');";
  //const queryStr = "INSERT INTO public.user (first_name, country) VALUES ('"+name+"','"+country+"');";
  pool.query(queryStr, (err, response) => {
   console.log(err, response);
   console.log("status from DB: ", response);
   pool.end();
   // pool.end(() => {});
 });
}

function selectHighScore() {

    //  const client = initClient();
    //  client.connect();

    // const queryStr = "SELECT * FROM public.highscore order by score desc";

    // client.query(query, (err, res) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     for (let row of res.rows) {
    //         console.log(row);
    //     }
    //     client.end();
    // });

    const pool = initDbPool();

    const queryStr = "SELECT * FROM public.highscore order by score desc";

    // pool.query(queryStr, (err, response) => {
    pool.query(queryStr, (err, response) => {
        //console.log(err, response);
        // console.log("status from DB: ", response);
        pool.end();
    });
}

function initClient() {

    const { Client } = require('pg');

    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'Metago',
        password: "parkerWilson01",
        port: 5432
    });

}

function initDbPool()
{
    const { Pool, Client } = require('pg');

    return new Pool({
        user: "postgres",
        //host: "http://localhost:5432/",
        host: "localhost",
        // database: "PostgreSQLdb",
        database: "Metago",
        password: "parkerWilson01",
        port: 5432
    });
}

async function setDb() {

    const name = document.getElementById('name').value;
    const country = document.getElementById('country').value;
    //const name = "friedric";
    //const country = "brooo";

    const data = { name, country };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    //this sends to server              then-method gets from server
    const response = await fetch('/dbSet', options);
    const json = await response.json();
    console.log('This is the message from the server: ', json);
}
//-----------------------------------------------------------------


// app.post('/nodeSetDbHighScore', (request, response) =>{
//     console.log("The server received a request");
//     console.log(request.body);
//     if(request.body.username != '' && request.body.scoreCounter != '')
//     {
//         db.insertDbHighScore(request.body.username, request.body.scoreCounter);
//         response.json({
//             status: 'Success',
//         });
//     }
//     else
//         console.log('enter textfields');
//     //this gets returned to client in 'then'-method in fetch
// });

// app.post('/dbSet', (request, response) =>{
//     console.log('eyo');
// });


//mest basic fetch metode
app.post('/test', (request, response) =>{
    console.log('eyo');
});



// app.post('/api', (request, response) =>{
//     console.log("The server received a request");
//     console.log(request.body);

//     //this gets returned to client in 'then'-method in fetch
//     response.json({
//         status: 'Success',
//     });
// });

















//import npm installed module

//file list
// var fs = require('fs');
// const { execPath } = require('process');
// var files = fs.readdirSync('public/teststuff/').;
// console.log(files);
// for each(file => files)



// app.use(express.static('./public'));

// const { readFile } = require('fs').promises;// import

// app.get('/', async (request, response) => {
 
//         // if(err){
//         //     response.status(500).send('didn\'t work, brother!');
//         // }
//         //sending this text from server to client
//         //response.send(await readFile('./index.html', 'utf8'));
//         response.send(await readFile('./index.html', 'utf8'));

// });

// app.listen(process.env.PORT || 3000, () => console.log('app available on http://localhost:3000'));

// // var io = require('socket.io').listen(80); // initiate socket.io server

// // io.sockets.on('connection', function (socket) {
// //   socket.emit('news', { hello: 'world' }); // Send data to client

// //   // wait for the event raised by the client
// //   socket.on('my other event', function (data) {  
// //     console.log(data);
// //   });
// // });