
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    // var userChosenColour = this.id; //this works as well
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    console.log("userClickedPattern : " + userClickedPattern);
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level = " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    console.log("gamePattern : " + gamePattern);
}

function playSound(currentColour){
    (new Audio("sounds/"+currentColour+".mp3")).play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    if(!gameStarted){
        gameStarted = true;
        $("#level-title").text("Level = " + level);
        nextSequence();

    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 3000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
    // userClickedPattern = [];
}