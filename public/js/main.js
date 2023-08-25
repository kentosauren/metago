
// var toggle = false;

const text1 = "parchament";
const text2 = "paper";


var body = document.getElementById('body');
var tester = document.getElementById('tester');
var testchild = document.getElementById('testchild');
var fontsizeText = document.getElementById('fontsizeText');
var slider = document.getElementById('slider');
var sliderValueText = document.getElementById('sliderValueText');

<div id="sliderValueText">0</div>

document.querySelector('input')
    .addEventListener('input', evt => {
        //sliderValueText.innerHTML = evt.target.value;
        tester.style.fontSize = evt.target.value;

    });

document.addEventListener('keydown', function (e) {
    if (e.which === 37 || e.which === 39 || e.which === 38 || e.which === 40) {
        movePlayer(e.which)
    }
})

var fontSize = parseInt(tester.style.fontSize);

var sliderValue = parseInt(slider.value);

testchild.innerHTML = text1;





function sliderFunc() {
    sliderValueText.innerHTML = slider.value;
}
function changeBg(type) {
    var bgcolor;

    if (type == 1)
        bgcolor = "black"
    if (type == 2)
        bgcolor = "green"
    if (type == 3)
        bgcolor = "red"

    body.style.backgroundColor = bgcolor;
    console.log(bgcolor);
}

function fontFunc(type) {
    if (type == 1)
        fontSize += 10;
    else
        fontSize -= 10;

    testchild.style.fontSize = fontSize;
    console.log(fontSize);
}

function testFunc2() {

    if (testchild.innerHTML == text2)
        fontSize++;
    else
        fontSize--;

    testchild.style.fontSize = fontSize;
}

function testFunc() {

    if (testchild.innerHTML == text2)
        testchild.innerHTML = text1;
    else
        testchild.innerHTML = text2;
}


// function dbtest()
// {
//     <script src="/socket.io/socket.io.js"></script>
//     var io = require('socket.io').listen(3000); // initiate socket.io server

//     io.sockets.on('connection', function (socket) {
//       socket.emit('news', { hello: 'world' }); // Send data to client
    
//       // wait for the event raised by the client
//       socket.on('my other event', function (data) {  
//         console.log(data);
//       });
//     });

// }