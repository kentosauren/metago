//line
// ctx.moveTo(0, 0); - defines the starting point of the line
// ctx.lineTo(200, 100); - defines the ending point of the line
// ctx.stroke();

//rect
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 150, 75);

//circle
// ctx.beginPath();
// ctx.arc(95, 50, 40, 0, 2 * Math.PI);
// ctx.stroke();

//text
// ctx.font = "30px Comic Sans MS";
// ctx.fillStyle = "red";
// ctx.textAlign = "center";
// ctx.fillText("Hello World", canvas.width/2, canvas.height/2);

//Array methods:
// The pop() method removes the last element from an array:
// The push() method adds a new element to an array (at the end):
//The shift() method removes the first array element and "shifts" all other elements to a lower index.
//The unshift() method adds a new element to an array (at the beginning), and "unshifts" older elements:
//The concat() method creates a new array by merging (concatenating) existing arrays:
//  let test = ["banana" , "apple"];
//  test.unshift("hello");
//  test.pop("fromage");
//  console.log(test);
//---------------------------------------------------------------------------------


class Snake {

    travelDirection;
    initialSnakeLength;
    snakeTailList;

    constructor(xpos, ypos) {
        if (!xpos)
            this.xpos = (playfieldSize / 2);
        else
            this.xpos = xpos;

        if (!ypos)
            this.ypos = (playfieldSize / 2);
        else
            this.ypos = ypos;

        this.snakeTailList = [
            { xpos: (playfieldSize / 2), ypos: (playfieldSize / 2) },
            { xpos: (playfieldSize / 2) - (blockSize), ypos: (playfieldSize / 2) },
            { xpos: (playfieldSize / 2) - (blockSize * 2), ypos: (playfieldSize / 2) },
        ];

        this.travelDirection = -1;
        this.initialSnakeLength = 3;

        context.fillStyle = color.gold;
        context.fillRect(this.xpos, this.ypos, blockSize, blockSize);

        context.fillStyle = color.green;
        for (let i = 1; i < this.snakeTailList.length; i++)
            context.fillRect(this.snakeTailList[i].xpos, this.snakeTailList[i].ypos, blockSize, blockSize);
    }

    isFoodCollision(food) {
        if ((this.xpos == food.xpos) && (this.ypos == food.ypos))
            return true;
        else
            return false;
    }

    isTailCollision() {

        let isCollision = false;

        for (let i = 0; i < this.snakeTailList.length; i++) {
            if ((this.xpos == this.snakeTailList[i].xpos) && (this.ypos == this.snakeTailList[i].ypos)) {
                isCollision = true;
            }
        }

        if (isCollision)
            return true;
        else
            return false;
    }
}

class Food {
    constructor(xpos, ypos) {
        this.setRandomFoodPosition([]);
        context.fillStyle = color.white;
        context.fillRect(this.xpos, this.ypos, blockSize, blockSize);
    }

    setRandomFoodPosition(snakeTailList) {

        let x;
        let y;

        if (snakeTailList.length == 0) {
            x = 100;
            y = 100;
        } else {

            let validPosition = false;

            while (!validPosition) {
                x = Math.floor(Math.random() * (playfieldSize / blockSize)) * blockSize;
                y = Math.floor(Math.random() * (playfieldSize / blockSize)) * blockSize;

                for (let i = 0; i < snakeTailList.length; i++) {
                    if ((x == snakeTailList[i].xpos) && (y == snakeTailList[i].ypos)) {
                        validPosition = false;
                        break;
                    } else {
                        validPosition = true;

                    }
                }
            }
        }

        this.xpos = x;
        this.ypos = y;
        context.fillStyle = color.white;
        context.fillRect(this.xpos, this.ypos, blockSize, blockSize);
    }
}

//---------------------------------------------------------

const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

const blockSize = 50;
const playfieldSize = 600;
const movementSpeed = 140;

const color =
{
    pink: '#b86468',
    gold: '#cc963c',
    brown: '#956b36',
    darkbrown: '#643f1e',
    green: '#647445',
    white: '#ffffff',
    red: '#611F1F'
}

//---------------------------------------------------------

let clickSound = new Audio('assets/game/snake/click2.wav');
let inputbuffer = [];
let snakelengthcounter = 0;
let scoreCounter = 0;
//  let scoreCounter = 22000;
let keyInput = -1;
let isDead = false;


const highScoreInputCollection = document.getElementById('highScoreInputCollection');
// highScoreInputCollection.hidden = true;
const scoreText = document.getElementById('scoreText');
const playfield = document.getElementById('playfield');
const context = playfield.getContext("2d");

let snake = new Snake();
let food = new Food();

//playfield.style.backgroundColor = color.pink;

getHighScore();
// hideHighScoreSubmit();

//  drawGrid();

setInterval(function () { movePlayer(keyInput) }, movementSpeed);

document.addEventListener('keydown', function (e) {
    if (!isDead) {
        if (e.which === 37 || e.which === 39 || e.which === 38 || e.which === 40 ||
            e.which === 87 || e.which === 65 || e.which === 83 || e.which === 68) {

            // W 87
            // A 65
            // S 83
            // D 68

            let tmp;

            switch (e.which) {
                case 87:
                    tmp = UP;
                    break;
                case 65:
                    tmp = LEFT;
                    break;
                case 83:
                    tmp = DOWN;
                    break;
                case 68:
                    tmp = RIGHT;
                    break;
                default:
                    tmp = e.which;
            }

            // avoiding repeated keypresses to be added
            if (inputbuffer[inputbuffer.length - 1] != tmp)
                inputbuffer.push(tmp);
        }
    }else
        if(e.which === 82)
            retryButton();
})
function hideHighScoreSubmit()
{
    const hsSubmit = document.getElementById('highScoreInputCollection');
    hsSubmit.hidden = true;
    
}

//FUNCTIONS   -------------------------------------------------------------
async function getHighScore() {
    const response = await fetch('/getHighScore');
    const data = await response.json();

    await refreshHighScoreList(data);

    return isHighScore;
}

function refreshHighScoreList(data) {

    var nf = Intl.NumberFormat();
    const HighScoreListDiv = document.getElementById('HighScoreList');
    let highScoreBuilder = "";

    for (let row of data.rows)
        highScoreBuilder += `<li><div style='float: left;'>${row.username}</div><div style='float:right'>${nf.format(row.score)}</div></li>`;

    HighScoreListDiv.innerHTML = highScoreBuilder;
}

async function setHighScore() {

    if (scoreCounter > 0) {
        const username = document.getElementById('highScoreTextInput').value;
        const data = { username, scoreCounter, gameid: 1 };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        //this sends to server              then-method gets from server
        const response = await fetch('/nodeSetDbHighScore', options);
        const json = await response.json();
        // console.log('This is the message from the server: ', json);

        scoreCounter = 0;

    }
    for (let x = 0; x < 5; x++)
        getHighScore();

}

function retryButton() {

    context.fillStyle = color.red;
    context.fillRect(0, 0, playfieldSize, playfieldSize);

    scoreCounter = 0;
    keyInput = -1;
    isDead = false;
    snake = new Snake();
    food = new Food();

    inputbuffer = [];
    highScoreInputCollection.hidden = true;
    scoreText.textContent = "0";
    getHighScore();
}

function killScreen() {

    isDead = true;

    context.font = "60px tahoma";
    context.fillStyle = color.white;
    context.textAlign = "center";

    context.fillText("U DED BRO!", playfield.width / 2, playfield.height / 4);

    context.font = "100px tahoma";
    context.fillText(scoreText.textContent + ' pts.', playfield.width / 2, (playfield.height / 4) + 100);

    //logic for highscore
    getHighScore();

    highScoreInputCollection.hidden = false;

}

function movePlayer() {

    if (!isDead) {
        let switchValue;
        if (inputbuffer == 0)
            switchValue = snake.travelDirection;
        else
            switchValue = inputbuffer[0];

        switch (switchValue) {
            case LEFT:
                moveLeft();
                break;

            case RIGHT:
                moveRight();
                break;

            case UP:
                moveUp();
                break;

            case DOWN:
                moveDown();
                break;
        }


        if (snake.travelDirection != -1) {//if player has started moving
            inputbuffer.shift();

            context.clearRect(snake.snakeTailList[snake.snakeTailList.length - 1].xpos, snake.snakeTailList[snake.snakeTailList.length - 1].ypos, blockSize, blockSize);
            snake.snakeTailList.pop();

            if (snake.isTailCollision()) {
                clickSound.play();
                killScreen();
                return;
            }
            //Add and remove blocks from snake
            snake.snakeTailList.unshift({ xpos: snake.xpos, ypos: snake.ypos });

            //drawing snake head in a different color
            context.fillStyle = color.gold;
            context.fillRect(snake.xpos, snake.ypos, blockSize, blockSize);

            context.fillStyle = color.green;
            context.fillRect(snake.snakeTailList[1].xpos, snake.snakeTailList[1].ypos, blockSize, blockSize);

            //snake eats food
            if (snake.isFoodCollision(food)) {
                clickSound.play();

                food.setRandomFoodPosition(snake.snakeTailList);
                scoreCounter += 10;
                scoreText.textContent = scoreCounter;
                snake.snakeTailList.push(snake.snakeTailList[snake.snakeTailList.length - 1]);
            }
        }
    }
}

{//movement logic

function moveDown() {
    if (snake.travelDirection == UP || snake.travelDirection == -1)
        moveUp();
    else
        if (snake.ypos < playfieldSize - blockSize) {
            snake.ypos += blockSize;
            snake.travelDirection = DOWN;
        }
        else {
            // player.ypos = playfieldSize - blockSize;
            snake.ypos = 0;
            snake.travelDirection = DOWN;
        }
}

function moveUp() {
    if (snake.travelDirection == DOWN)
        moveDown();
    else if (snake.ypos > 0) {
        snake.ypos -= blockSize;
        snake.travelDirection = UP;
    }
    else {       //player.ypos = 0;
        snake.ypos = playfieldSize - blockSize;
        snake.travelDirection = UP;
    }
}

function moveRight() {
    if (snake.travelDirection == LEFT)
        moveLeft();
    else if (snake.xpos < playfieldSize - blockSize) {
        snake.xpos += blockSize;
        snake.travelDirection = RIGHT;
    }
    else {
        //player.xpos = playfieldSize - blockSize;
        snake.xpos = 0;
        snake.travelDirection = RIGHT;
    }

}

function moveLeft() {
    if (snake.travelDirection == RIGHT || snake.travelDirection == -1)
        moveRight();
    else if (snake.xpos > 0) {
        snake.xpos -= blockSize;
        snake.travelDirection = LEFT;
    }
    else {
        //player.xpos = 0;
        snake.xpos = playfieldSize - blockSize;
        snake.travelDirection = LEFT;
    }
}

function drawGrid() {
    let counter = 0;
    let scalar = 0;
    let cellAmt = playfieldSize / blockSize;
    context.strokeStyle = 'grey';

    while (counter < cellAmt) {
        counter++;
        scalar += blockSize;

        //X
        context.moveTo(0, scalar);
        context.lineTo(playfieldSize, scalar);
        context.stroke();

        //Y
        context.moveTo(scalar, 0);
        context.lineTo(scalar, playfieldSize);
        context.stroke();
    }
}

}