// var randomNumberGenerator = function (size) {
//   return Math.ceil(Math.random() * size);
// };
$(document).ready(function () {
  var currentQuestion;
  var timeLeft = 10;

  var interval = setInterval(function () {
    timeLeft--;
    if (timeLeft === 0) {
      clearInterval(interval);
    }
    console.log(timeLeft);
  }, 1000);

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
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  //CHECKS YOUR ANSWER TO SEE IF IT MATCHES WITH THE CORRECT RESULT
  var checkAnswer = function (userInput, answer) {
    console.log(userInput === answer);
    if (userInput === answer) {
      $("#user-input").val("");
      renderNewQuestion();
    } else {
      setTimeout(function () {
        $("#user-input").val("");
      }, 500);
    }
  };
  renderNewQuestion();
});
