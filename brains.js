$(document).ready(function () {
  var currentQuestion;
  var timeLeft = 9;
  var interval;
  var score = 0;
  var x = document.getElementById("seconds-left");
  x.style.visibility = "hidden";
  var y;

  //FUNCTION CALL TO UPDATE USERS SCORE
  var updateScore = function (amount) {
    score += amount;
    $("#score").text(score);
  };

  //UPDATES THE COUNTDOWN TIMER
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $("#time-left").text(timeLeft);
      x.style.visibility = "visible";
  };

  //SHOWS THE MATH EQUATION ON THE SCREEN
  var renderNewQuestion = function () {
    var random = Math.ceil(Math.random() * 2);
    currentQuestion = questionGenerator();
    if (random == 1) {
      y = 1;
      $("#equation").text(currentQuestion.equation)
    } else if (random == 2) {
      y = 0;
      $("#equation").text(currentQuestion.mulitplyEquation);
    } else {

    }
  };

  //GENERATES A RANDOM EQUATION
  var questionGenerator = function () {
    var question = {};
    var num1 = Math.ceil(Math.random() * 10);
    var num2 = Math.ceil(Math.random() * 10);
    var num3 = Math.ceil(Math.random() * 5);
    var num4 = Math.ceil(Math.random() * 5);

    question.multiplyAnswer = num3 * num4;
    question.mulitplyEquation = String(num3) + " * " + String(num4)
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

 // STARTS THE GAME WHEN YOU PRESS A KEY AND CHECKS YOUR ANSWER
 // EXCLUDES THE ENTER KEY FOR WHEN YOU CLEAR THE ALERT AT END OF GAME
     $("#user-input").on("keyup", function (e) {
      if(e.keyCode == 13) {
    } else {
      startGame();
      if (y == 1) {
        checkAnswer(Number($(this).val()), currentQuestion.answer);
        console.log(y)
      } else {
        checkAnswer(Number($(this).val()), currentQuestion.multiplyAnswer);
        console.log(y)
      }
    }
   });


  //CHECKS YOUR ANSWER TO SEE IF IT MATCHES WITH THE CORRECT RESULT
  var checkAnswer = function (userInput, answer) {
    console.log(userInput === answer);
    if (userInput === answer) {
      renderNewQuestion();
      $("#user-input").val("");
      updateTimeLeft(+1);
      updateScore(+1);
    } else {
      setTimeout(function () {
        $("#user-input").val("");
      }, 500);
    }
  };

  //FUNCTION TO START THE GAME
  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(9);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
          alert("You scored " + score + " points.");
        }
      }, 1000);
    }
  };

  renderNewQuestion();
});
