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
    var random = Math.floor(Math.random() * 4);
    currentQuestion = questionGenerator();
    if (random == 1) {
      y = 1;
      $("#equation").text(currentQuestion.equation)
    } else if (random == 2) {
      y = 2;
      $("#equation").text(currentQuestion.mulitplyEquation);
    } else if (random == 0) {
      $("#equation").text(currentQuestion.divideEquation);
      y = 0;
    } else if (random == 3) {
      $("#equation").text(currentQuestion.minusEquation);
      y = 3;
    }
  };

  //GENERATES A RANDOM EQUATION
  var questionGenerator = function () {
    var question = {};
    var num1 = Math.ceil(Math.random() * 10);
    var num2 = Math.ceil(Math.random() * 10);
    var num3 = Math.ceil(Math.random() * 5);
    var num4 = Math.ceil(Math.random() * 5);
    
    //GETTING AND SETTING THE NUMBERS FOR SUBTRACTION
    var num7;
    var num8;
    var flag2 = true;
    let minusGenerator = function() {
      var tempNum3 = Math.ceil(Math.random() * 10);
      var tempNum4 = Math.ceil(Math.random() * 10);
      num7 = tempNum3;
      num8 = tempNum4;
    }
    minusGenerator();

    while(flag2 == true) {
      if (num7 >= num8) {
        question.minusAnswer = num7 - num8;
        question.minusEquation = String(num7) + " - " + String(num8);
        flag2 = false;
      } else {
        minusGenerator();
      }
    }
      
    question.multiplyAnswer = num3 * num4;
    question.mulitplyEquation = String(num3) + " * " + String(num4)
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    //GETTING AND SETTING THE NUMBERS FOR DIVISION
      var num5;
      var num6;
      var flag = true;
      let divideGenerator = function() {
        var tempNum = Math.ceil(Math.random() * 20);
        var tempNum2 = Math.ceil(Math.random() * 20 + 1);
        num5 = tempNum;
        num6 = tempNum2;
      }
      divideGenerator();
      
      while(flag == true) {
        if (num5 > num6 && num5/num6 % 1 == 0) {
          question.divideAnswer = num5 / num6;
          question.divideEquation = String(num5) + " / " + String(num6);
          flag = false;
        } else {
          divideGenerator();
        }
      }
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
      } else if (y == 2) {
        checkAnswer(Number($(this).val()), currentQuestion.multiplyAnswer);
      } else if (y == 0) {
        checkAnswer(Number($(this).val()), currentQuestion.divideAnswer);
      } else if (y == 3) {
        checkAnswer(Number($(this).val()), currentQuestion.minusAnswer);      }
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
