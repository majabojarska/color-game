var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay")
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".modeButton");

var squareContainers;
var squares;

var container = document.querySelector("#container")
var modeID = 1;

var modeParameters = {
    "totalSquares": [2, 4, 9, 16, 64, 1],
    "squareWidthPercent": ["50%", "50%", "33.3333333%", "25%", "12.5%", "100%"],
    "squareHeightPercent": ["50%", "50%", "33.3333333%", "25%", "12.5%", "100%"]
}

// mode buttons listeners
for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
        modeID = Array.from(modeButtons).indexOf(event.target);
        console.log("Mode button clicked: " + modeID);

        updateButtonStyle(modeButtons, modeID);
        generateSquares(modeID);
    });
}

resetButton.addEventListener("click", function () {
    generateSquares(modeID);
});

// functions

function generateSquares(inputModeID) {
    // modeID Fix
    if (!inputModeID) {
        inputModeID = modeID;
    }

    // HTML Content
    newContainerHTML = "";
    for (var i = 0; i < modeParameters.totalSquares[inputModeID]; i++) {
        newContainerHTML += "<div class=\"squareContainer\"><div class=\"square\"></div></div>";
    }
    container.innerHTML = newContainerHTML;

    // Event Listeners
    squareContainers = document.querySelectorAll(".squareContainer");
    squares = document.querySelectorAll(".square");

    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            if (this.style.backgroundColor === pickedColor) {
                updateMessage("Correct <i class=\"fas fa-heart\"></i>");
                changeAllColors(pickedColor);
            } else {
                this.style.backgroundColor = "#232323";
                updateMessage("Wrong <i class=\"fas fa-sad-tear\"></i>");
            }
        });
    }

    colorArray = generateRandomColorArray(modeParameters.totalSquares[inputModeID]);
    // Update color and visibility
    for (var i = 0; i < modeParameters.totalSquares[inputModeID]; i++) {
        if (colorArray[i]) {
            console.log(i + ": " + colorArray[i]);
            squares[i].style.backgroundColor = colorArray[i];
            squareContainers[i].style.display = "block";
        } else {
            console.log(i + ": " + colorArray[i]);
            squareContainers[i].style.display = "none";
        }
        squareContainers[i].style.width = modeParameters.squareWidthPercent[inputModeID];
        squareContainers[i].style.height = modeParameters.squareHeightPercent[inputModeID];
    }

    h1.style.backgroundColor = "steelblue";
    updateMessage("Guess the color");

    pickedColor = pickColor(colorArray);
}

function pickColor(colorArray) {

    var colorIndex = Math.floor(Math.random() * colorArray.length);
    colorDisplay.textContent = colorArray[colorIndex];
    return colorArray[colorIndex];

}

function checkChoice(squareColor, pickedColor) {
    if (squareColor === pickedColor) {
        updateMessage("Correct <i class=\"fas fa-heart\"></i>");
        changeAllColors(pickedColor);
    } else {
        square.style.backgroundColor = "#232323";
        updateMessage("Wrong <i class=\"fas fa-sad-tear\"></i>");
    }
}

function updateButtonStyle(modeButtonsNodeList, inputModeID) {
    for (var i = 0; i < modeButtonsNodeList.length; i++) {
        if (i != inputModeID) {
            modeButtonsNodeList[i].classList.remove("selected");
        }
        modeButtonsNodeList[inputModeID].classList.add("selected");
    }
    console.log("modeButtons style updated")
}

function updateMessage(text) {
    if (!text) {
        text = "";
    }
    messageDisplay.innerHTML = text;
}

function changeAllColors(color) {
    for (var i = 0; i < modeParameters.totalSquares[modeID]; i++) {
        squares[i].style.backgroundColor = color;
    }

    h1.style.backgroundColor = color;
}

function generateRandomColor() {
    var color = "rgb(";
    color += Math.floor(Math.random() * 256);
    color += ", ";
    color += Math.floor(Math.random() * 256);
    color += ", ";
    color += Math.floor(Math.random() * 255);
    color += ")";

    return color;
}

function generateRandomColorArray(num) {
    var newColorArray = [];
    for (var i = 0; i < num; i++) {
        newColorArray.push(generateRandomColor());
    }
    return newColorArray;
}

// global variables
var pickedColor;

// the rest of the code
generateSquares(modeID);
updateButtonStyle(modeButtons, modeID);