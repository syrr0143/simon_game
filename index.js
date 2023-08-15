var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];  // array of colors we are using 

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        newsequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                newsequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Refresh to Restart");

    }

}


function newsequence() {
userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);   // generating the random number
    var randomChosenColor = buttonColors[randomNumber]; // chosing the random color
    gamePattern.push(randomChosenColor);                   // storing the pattern we are clicking on
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);  // game start animation 
    playSound(randomChosenColor);   // game start sound
}



// a flexible function to play sound whenevr required with parameter name
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// this function will detect whenever we click on button we have created in our website and it will plau sound and also apply the animation required


// the animation function is created to be used when we click a button , it has a timeout of 100 ms


function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");

    // Remove the "pressed" class after a short delay
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}





