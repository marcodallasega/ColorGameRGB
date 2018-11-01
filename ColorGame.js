var red   = document.getElementById("red");
var green = document.getElementById("green");
var blue  = document.querySelector("#blue");    //just to remind another selector
var btnNewColors = document.getElementById("new-colors");
var info = document.getElementById("text-info");
var btnEasy = document.getElementById("easy");
var btnHard  = document.querySelector("#hard");    //just to remind another selector
var squares;
var targetRGB;
var targetSquare;
var guessed= false;

// ----------------- FUNCTIONS ----------------------

function randomRGB() {
    var red   = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue  = Math.floor(Math.random() * 256);
    return [red, green, blue];
}

function choose(myArray) {
    var ndx = Math.floor(Math.random() * myArray.length);
    return myArray[ndx];
}

function showAll() {
    // show all the squares
    btnHard.classList.add("clicked");
    btnEasy.classList.remove("clicked");
    var tempList = document.querySelectorAll(".squares");
    for (var i=0; i<tempList.length; i++) {
        tempList[i].classList.remove("transparent");
    }
}

function hideHalf() {
    // hide the row without the target
    if (squares.length == 6) {
        btnEasy.classList.add("clicked");
        btnHard.classList.remove("clicked");
        for (var i=0; i<squares.length; i++) {
            if (squares[i] === targetSquare) {
                if (i<3) {
                    var tempList = document.querySelectorAll(".row2");
                    for (var j=0; j<tempList.length; j++) {
                        tempList[j].classList.add("transparent");
                    }
                }
                else {
                    var tempList = document.querySelectorAll(".row1");
                    for (var j=0; j<tempList.length; j++) {
                        tempList[j].classList.add("transparent");
                    }
                }
            }
        }
    }
}

function checkAnswer(yourChoice, correctAnswer) {
    // check the guess (the input "yourChoice" must be one of the squares)
    // return 1 if correct, 0 otherwise
    if (yourChoice === correctAnswer) {
        guessed = true;
        info.innerText = "YOU WON!";
        document.querySelector(".title").style.backgroundColor = "rgb("+targetRGB[0]+", "+targetRGB[1]+", "+targetRGB[2]+")";
        for (var i=0; i<squares.length; i++) {
            squares[i].style.backgroundColor = "rgb("+targetRGB[0]+", "+targetRGB[1]+", "+targetRGB[2]+")";
        }
        showAll();
        return 1;
    }
    else {
        // add IF to block the game when the answer is guessed
        if (!guessed) {
            info.innerText = "Try Again!";
            yourChoice.classList.add("transparent");
            return 0;
        }
    }
}

function setSquaresButton() {
    for (var i=0; i<squares.length; i++) {
        squares[i].addEventListener("click", function() {
            checkAnswer(this, targetSquare);
        });
    }
}

function startGame() {
    // Initialize the game.
    document.querySelector(".title").style.backgroundColor = "";
    info.innerText = "";
    squares = document.querySelectorAll(".squares");
    targetSquare = choose(squares);
    targetRGB = randomRGB();
    red.innerText   = targetRGB[0];
    green.innerText = targetRGB[1];
    blue.innerText  = targetRGB[2];

    targetSquare.style.backgroundColor = "rgb("+targetRGB[0]+", "+targetRGB[1]+", "+targetRGB[2]+")";
    for (var i=0; i<squares.length; i++) {
        if (squares[i] !== targetSquare) {
            var tempRGB = randomRGB();
            squares[i].style.backgroundColor = "rgb("+tempRGB[0]+", "+tempRGB[1]+", "+tempRGB[2]+")";
        }
    }
    setSquaresButton();
}


// ----------------- MAIN PROGRAM ----------------------
startGame();

btnEasy.addEventListener("click", hideHalf);
btnHard.addEventListener("click", showAll);
btnNewColors.addEventListener("click", function() {
    // restart the game with new colors
    guessed = false;
    showAll();
    startGame();
});

