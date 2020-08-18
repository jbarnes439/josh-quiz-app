'use strict';


/**
 * 
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateHomePageHTML() {
    return `    
      <div class="container">
                <h1>Welcome to the sports quiz!</h1>
                <form id="js-opening-page">
                    <button type="button" id="start-quiz">Start the Quiz!</button>
                </form>
                <img src='images/state-farm-stadium.jpeg' alt='Arizona Cardinals Stadium reflected in a pool of water'>
            </div>`;

}


function generateQuestionHTML() {

    let currentQuestion = store.questions[store.questionNumber];

    return `
  <div class="container">       
       <form id="js-question-form">
            <legend>${currentQuestion.name}</legend>
           <input type="radio" name="answers" value=${currentQuestion.answers[0]}>
           <label class="answer-select">${currentQuestion.answers[0]}</label><br>
           <input type="radio"  name="answers" value=${currentQuestion.answers[1]}>
           <label class="answer-select">${currentQuestion.answers[1]}</label><br>
           <input type="radio" name="answers" value=${currentQuestion.answers[2]}>
           <label class="answer-select">${currentQuestion.answers[2]}</label><br>
           <input type="radio" name="answers" value=${currentQuestion.answers[3]}>
           <label class="answer-select">${currentQuestion.answers[3]}</label><br>
           <button type="submit" id="give-answer">Send it!</button>
       </form>
       <quiz-place>Question number: ${store.questionNumber + 1} out of 6.</quiz-place><br>
       <score-spot>You have gotten ${store.score} right!</score-spot>
       <img src='${currentQuestion.image}' alt=${currentQuestion.imageAlt}>
     </div>`;
}


function generateResultsPageHTML() {
    return `    
      <div class="container">
                <h1>Thanks for taking our quiz!</h1>
                <form id="js-result-page">
                    <button type="button" id="restart-quiz">Take it Again!</button>
                </form>
                <div>Congrats! you got ${store.score} out of ${store.questions.length} right.</div>
                <img src='images/trophy.jpg' alt='The covetted Vince Lombardi Trophy'>
            </div>`;
}

function generatePositiveFeedbackHTML() {
    let currentQuestion = store.questions[store.questionNumber];
    return `    
      <div class="container">
                <h2>Score! ${currentQuestion.correctAnswer} is correct!</h2>
                <p></p>
                <form id="js-positive-results-page">
                    <button type="button" id="next">Next Question</button>
                </form>
                <img src='images/uprights.jpg' alt='Football going cleanly through the uprights'>
                
            </div>`;
}

function generateNegativeFeedbackHTML() {
    let currentQuestion = store.questions[store.questionNumber];
    return `    
      <div class="container">
                <h2>Brick! Sorry, but ${currentQuestion.correctAnswer} was the correct answer.</h2>
                <p></p>
                <form id="js-negative-results-page">
                    <button type="button" id="next">Next Question</button>
                </form>
                <img src='images/brick.jpg' alt='Basketball taking a hard bounce off the rim'>                
            </div>`;
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderHomePage() {
    $('main').html(generateHomePageHTML());
}

function renderQuestionPage() {
    $('main').html(generateQuestionHTML());
}

function renderResultsPage() {
    $('main').html(generateResultsPageHTML());
}

function renderPositiveFeedbackPage() {
    $('main').html(generatePositiveFeedbackHTML());
}

function renderNegativeFeedbackPage() {
    $('main').html(generateNegativeFeedbackHTML());
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

function startPageButton() {
    $('main').on('click', '#start-quiz', event => {

        event.preventDefault();
        renderQuestionPage();

    });

}

function nextQuestionButton() {
    $('main').on('click', '#next', function(event) {

        event.preventDefault();
        if (store.questionNumber < store.questions.length - 1) {
            store.questionNumber++;
            renderQuestionPage();
        } else {
            renderResultsPage();
        }

    });
}

function restartPageButton() {
    $('main').on('click', '#restart-quiz', function(event) {
        console.log('does anything work?');
        event.preventDefault();
        store.score = 0;
        store.quizStarted = false;
        store.questionNumber = 0;
        renderHomePage();
    });
}


function submitAnswer() {
    $('main').on('submit', '#js-question-form', function(event) {
        event.preventDefault();
        let currentQuestion = store.questions[store.questionNumber];

        if ($('input:checked').val() !== undefined) {

            if (parseInt(event.target.answers.value) === currentQuestion.correctAnswer) {
                store.score++;
                renderPositiveFeedbackPage();
            } else {
                renderNegativeFeedbackPage();
            }
            // ALWAYS RENDER AFTER CHANGING STORE! //

        } else {
            alert("You miss 100% of the shots you never take -Wayne Gretzky");
        }
    });
}



function handleQuiz() {
    generateHomePageHTML();
    renderHomePage();
    generateQuestionHTML();
    startPageButton();
    submitAnswer();
    restartPageButton();
    nextQuestionButton();
}

$(handleQuiz);