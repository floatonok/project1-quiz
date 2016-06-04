console.log('start');

function Question (question, answers, correctAnswerIndex) {
  this.question = question;
  this.choices = answers;
  this.correctAnswer = correctAnswerIndex;
}

var question0 = new Question('Lightning never strikes in the same place twice.', ['True', 'False'], 1);
var question1 = new Question('Water spirals down the plughole in opposite directions in the northern and southern hemispheres.', ['True', 'False'], 1);
var question2 = new Question('If you cry in space the tears just stick to your face.', ['True', 'False'], 0);
var question3 = new Question('If you cut an earthworm in half, both halves can regrow their body.', ['True', 'False'], 1);
var question4 = new Question('Humans can distinguish between over a trillion different smells.', ['True', 'False'], 0);
var question5 = new Question('Adults have fewer bones than babies do.', ['True', 'False'], 0);
var question6 = new Question('Napoleon Bonaparte was extremely short.', ['True', 'False'], 1);
var question7 = new Question('Goldfish only have a memory of three seconds.', ['True', 'False'], 1);
var question8 = new Question('Buzz Aldrin was the first man to urinate on the moon.', ['True', 'False'], 0);
var question9 = new Question('Humans can’t breathe and swallow at the same time.', ['True', 'False'], 0);
var question10 = new Question('The popular image of Santa Claus – chubby, bearded, in red and white clothes – was invented by Coca-Cola for an ad campaign.', ['True', 'False'], 1);
var question11 = new Question('The top of the Eiffel Tower leans away from the sun.', ['True', 'False'], 0);
var question12 = new Question('The owner of the company that makes Segways died after accidentally driving his Segway off a cliff.', ['True', 'False'], 0);
var question13 = new Question('The first floppy measured 8 in. (200 mm) in diameter.', ['True', 'False'], 0);

var quiz = {
  currentQuestion: 0,
  questions: [question0, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13],
  isGameOver: false,
  player1Points: 0,
  player2Points: 0
};

// return an integer that is the number of questions in a game
function numberOfQuestions () {
  return quiz.questions.length;
}

// return an integer that is the zero-based index of the current question in the quiz
function currentQuestion () {
  return quiz.currentQuestion;
}

// return an integer that is the zero-based index the correct answer for the currrent question
function correctAnswer () {
  return quiz.questions[quiz.currentQuestion].correctAnswer;
}

// return an integer that is the number of choices for the current question
function numberOfAnswers () {
  return quiz.questions[quiz.currentQuestion].choices.length;
}

// take a single integer, which specifies which choice (true or false) the current player wants to make
// return a boolean true/false if the answer is correct
function playTurn (choice) {
  if (isGameOver()) return false;
  if (choice == correctAnswer()) {
    var x = true;
    if (quiz.currentQuestion % 2 === 0) {
      quiz.player1Points++;
    } else if (quiz.currentQuestion % 2 !== 0) {
      quiz.player2Points++;
    }
  }
  if (choice !== correctAnswer()) {
    x = false;
  }
  quiz.currentQuestion++;
  if (currentQuestion() === numberOfQuestions() - 1) {
    quiz.isGameOver = true;
  }
  return x;
}

// return a true or false if the quiz is over
function isGameOver () {
  if (quiz.isGameOver) return true;
  return false;
}

// return 0 if the game is not over
// return 1 if player 1 won
// return 2 if player 2 won
// return 3 if its a draw
function whoWon () {
  if (!quiz.isGameOver) return 0;
  if (quiz.player1Points > quiz.player2Points) return 1;
  if (quiz.player2Points > quiz.player1Points) return 2;
  if (quiz.player1Points === quiz.player2Points) return 3;
}

function restart () {
  quiz.currentQuestion = 0;
  quiz.isGameOver = false;
  quiz.player1Points = 0;
  quiz.player2Points = 0;
}

// =========== jquery starts here ========================================================
var words = $('#words');
var button = $('.button');
var player1Score = $('#player1Score');
var player2Score = $('#player2Score');
var Qnumber = $('#Q');

updateDisplay();
function updateDisplay () {
  Qnumber.text('Q' + (currentQuestion() + 1));
  words.text(quiz.questions[currentQuestion()].question);
  player1Score.text(quiz.player1Points);
  player2Score.text(quiz.player2Points);
  if (isGameOver()) {
    Qnumber.text('^.^');
    if (whoWon() === 3) {
      words.text("It's a Draw!");
    } else {
      words.text('Game Over! Player ' + whoWon() + ' wins!');
    }
  }
}

button.click(function () {
  var choice = this.id;
  if (choice === 'zero') var z = 0;
  if (choice === 'one') z = 1;
  playTurn(z);
  updateDisplay();
});
