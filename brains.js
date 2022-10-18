// var randomNumberGenerator = function (size) {
//   return Math.ceil(Math.random() * size);
// };
$(document).ready(function () {
  var currentQuestion;
  var timeLeft = 10;
  var interval;
  var score = 0;

  var updateScore = function (amount) {
    score += amount;
    $("#score").text(score);
  };

  //UPDATES THE COUNTDOWN TIMER
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $("#time-left").text(timeLeft);
  };
  //COUNTDOWN TIMER
  // var interval = setInterval(function () {
  //   updateTimeLeft(-1);
  //   $("#time-left").text(timeLeft);
  //   if (timeLeft === 0) {
  //     clearInterval(interval);
  //   }
  //   console.log(timeLeft);
  // }, 1000);

  //SHOWS THE EQUATION ON THE SCREEN
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $("#equation").text(currentQuestion.equation);
  };

  //GENERATES A RANDOM EQUATION
  var questionGenerator = function () {
    var question = {};
    var num1 = Math.ceil(Math.random() * 10);
    var num2 = Math.ceil(Math.random() * 10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

  //SETS THE VALUE FOR WHAT YOU TYPED IN THE INPUT FIELD
  $("#user-input").on("keyup", function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
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

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  renderNewQuestion();
});
