var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [],
  userClickedPattern = [];
var p = 0,
  level = 0;

// To start Game

$(document).keypress(function() {
  if (p === 0) {
    nextSequence();
    p++;
  }
});

// User click, sound and animation

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Animation when button clicked

function animatePress(userChosenColour) {
  $("#" + userChosenColour).addClass("pressed");
  setTimeout(function() {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);
}

// Check if user got correct pattern

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }

  } else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    changeHeading("Game Over, Press Any Key to Restart");
    playSound("wrong");

    startOver();
  }
}

// Generate sequence

function nextSequence() {

  level++;
  changeHeading("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function changeHeading(t) {
  $("#level-title").text(t);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Restart game

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  p = 0;
  level = 0;
}
