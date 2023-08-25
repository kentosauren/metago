

console.log(process.platform);
console.log(process.env.USER);

global.fishSauce = "Oyster sauce is better";
console.log(global.fishSauce);




// events
// this event driven style of programming is very useful 
// when something is cpu intensive
const { EventEmitter } = require("stream"); // dette er en import
const eventEmitter = new EventEmitter();

eventEmitter.on('lunch', () => {
    console.log('yummy');
});

eventEmitter.emit('lunch');

/*

// file system
// read write and delete files on the file system
const { readFile, readFileSync } = require('fs');// import
// ting som ender i Sync betyr blocking
// sync gotta finish all of it's work before any other code can run

const file = readFileSync('./hello.txt', 'utf8');
console.log(file);
console.log('Do this ASAP'); // this is not run before txt is done

// do this instead:
const file2 = readFile('./hello.txt', 'utf8', (err, file2) => {
    console.log(file2);
});

console.log('Do this ASAP'); // now this is first
*/

//alternativt:
/*
const { readFile } = require('fs').promises;// import
async function hello(){
    const file3 = await readFile('./hello.txt', 'utf8');
    console.log(file3);

}

hello();
*/


//Modules:
const myModule = require('../my-module');
console.log(myModule);

//import npm installed module
const express = require('express');

const app = express();

// request> users incoming data
//response> your outgoing data
      //URL(root)
// app.get('/', (request, response) =>{
//     readFile('./indext.html', 'utf8', (err, html) =>{
//         if(err){
//             response.status(500).send('didn\'t work, brother!');
//         }
//         //sending this text from server to client
//         response.send(html);
//     })
// });

// tell our express app to listen to incoming requests


// for å unngå altfor mange callbacks, (callback hell)
// bruk require().promise i filesystem import og bruk await async istedet
// good when multiple async operations to handle in a single request
const { readFile } = require('fs').promises;// import



app.get('/', async (request, response) => {
 
        // if(err){
        //     response.status(500).send('didn\'t work, brother!');
        // }
        //sending this text from server to client
        response.send(await readFile('./index.html', 'utf8'));

});

app.listen(process.env.PORT || 3000, () => console.log('app available on http://localhost:3000'));


//terminal commands
//cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies 
// Set-ExecutionPolicy RemoteSigned


//npm init -y  
//npm install express