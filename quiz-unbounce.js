/****************************************************
* This script (in process, doesn't work now) will show a 
* jquery quiz in a code block. After the quiz has 
* been finished, the code block is set to disappear 
* and the form shows.
*
****************************************************/

(function() {
  var questions = [{
    question: "What is this?",
    choices: ["Impossible Balls", "Salmon Romseco"],
    correctAnswer: 0,
    photo: "images/balls.jpg",
    answerText: "Lorem Ipsum text about the answer"
  }, {
    question: "What is this?",
    choices: ["Impossible Balls", "Salmon Romseco"],
    correctAnswer: 1,
    photo: "images/salmon.jpg",
    answerText: "Lorem Ipsum text about the answer"
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#lp-code-287'); //set this as the id of the custom code block
  var block = quiz.parent();

  //display quiz intro
  displayIntro();

    //click handler for begin button
  $('#begin').on('click', function(e) {
    e.preventDefault();
    if(quiz.is(':animated')) {
      return false;
    }

    questionCounter = 0;
    selections = [];
    displayNext();

  });

  //click handler for 'final answer' button
  $('#final').on('click', function(e) {
    e.preventDefault();
    if(quiz.is(':animated')) {
      return false;
    }

    choose();

    //If no user selection, stop progress
    if(isNaN(selections[questionCounter])) {
      alert('Please make a selection.')
    } else {
      //but if the user selects an answer, display the answer screen;
      displayAnswer();
    }
  });

  //click handler for 'next' button
  $('#next').on('click', function(e) {
    e.preventDefault();
    if(quiz.is(':animated')) {
      return false;
    }

    questionCounter++
    displayNext();
  });


    // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

    //creates an intro text element
  function createIntroElement() {
    var iElement = $('<div>', {
      id: 'intro'
    });

    var logo  = $('<img src="" id="logo"/>');
    iElement.append(logo);

    var introText = $('<p>Test your knowledge about Eat Purely and get </p> <p><strong>A Free Meal From Eat Purely</strong></p>');
    iElement.append(introText);

    return iElement;

  }

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header.addClass("q"));

    var photo = $('<img src="' + questions[index].photo + '" id="qphoto" />');
    qElement.append(photo.addClass("q"));

    var question = $('<p>').append(questions[index].question);
    qElement.append(question.addClass("q"));


    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input id="radio" type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

    //function to create intro element and hides progress buttons
  function displayIntro() {
    var intro = createIntroElement();
    quiz.append(intro).fadeIn();

    $('#next').hide();
    $('#final').hide();
    $('#begin').show();
  }

  //create an element containing some small text for an answer
    function createAnswerElement(index) {
      var aElement = $('<div>', {
        id: 'answer'
      });
      if (selections[index] === questions[index].correctAnswer) {
        var answer = "right"
      } else {
        var answer = "wrong"
      }

      var header = $('<h2>You are ' + answer + '! </h2>');
      aElement.append(header);

      var question = $('<p>').append(questions[index].answerText);
      aElement.append(question);

      return aElement;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      $('#intro').remove();
      $('#answer').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        $('#next').hide();
        $('#final').show();
        $('#begin').hide()
      } else {
        var scoreElem = displayScore();
        quiz.fadeOut();
        block.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#begin').hide();
        $('#final').hide();
      }
    });
  }

  //displays the answer element
  function displayAnswer() {
    quiz.fadeOut(function() {
      $('#question').remove();
      var showAnswer = createAnswerElement(questionCounter);
        quiz.append(showAnswer).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        $('#next').show();
        $('#final').hide();
        $('#begin').hide()
  	});
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('#question');

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');

    var offer = $('<a href="https://eatpurely.com/register"><button id="offer">Click Here to Redeem Your Free Meal</button></a>')
    score.append(offer);
    return score;
  }
})();
