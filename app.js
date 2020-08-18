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

// this needs to reference our questions in our store object array
function generateQuestionHTML() {
    // store.questions[counter] will give the question at counter value
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
       <quiz-place>Question number: ${store.questionNumber + 1} out of 5.</quiz-place><br>
       <score-spot>You have gotten ${store.score} right!</score-spot>
       <img src='${currentQuestion.image}' alt=${currentQuestion.imageAlt}>
     </div>`;

    console.log('generateQuestionHTML ran');

}


function generateResultsPageHTML() {
    return `    
      <div class="container">
                <h1>Thanks for taking our quiz!</h1>
                <form id="js-result-page">
                    <button type="button" id="restart-quiz">Take it Again!</button>
                </form>
                <div>Congrats! you got ${store.score} out of ${store.questions.length-1} right.</div>
                <img src='images/trophy.jpg' alt='The covetted Vince Lombardi Trophy'>
            </div>`;
}

function generatePositiveFeedbackHTML() {
    let currentQuestion = store.questions[store.questionNumber];
    return `    
      <div class="container">
                <h2>Score! ${currentQuestion.answer} was correct!</h2>
                <p></p>
                <form id="js-positive-results-page">
                    <button type="button" id="next">Next Question</button>
                </form>
                
            </div>`;
}

function generateNegativeFeedbackHTML() {
    return `    
      <div class="container">
                <h2>Brick! ${currentQuestion.answer} was the correct answer.</h2>
                <p></p>
                <form id="js-negative-results-page">
                    <button type="button" id="next">Next Question</button>
                </form>                
            </div>`;
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
// if statement if right alert right answer if wrong alert wrong answer.
function renderMain() {

    if (store.questionNumber < 5 && store.quizStarted) {
        renderQuestionPage();
    } else if (store.questionNumber === 5 && store.quizStarted) {
        store.quizStarted = false;
        renderResultsPage();
    } else {
        renderHomePage();
    }
}


function renderHomePage() {
    $('main').html(generateHomePageHTML());
}


function renderQuestionPage() {
    $('main').html(generateQuestionHTML());
}

function renderResultsPage() {
    $('main').html(generateResultsPageHTML());
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

// This needs to send us to our question page.

function startPageButton() {
    $('main').on('click', '#start-quiz', event => {

        event.preventDefault();
        renderQuestionPage();

    });

}

// Needs to be linked to the positive/negative feedback results pages.
function nextQuestionButton() {
    $('main').on('submit', '#next', function(event) {
        event.preventDefault();
        if (store.questionNumber < store.questions.length - 1) {
            store.questionNumber++;
            renderQuestionPage();
        } else {
            renderFinalPage();
        }
    });
}


function restartPageButton() {
    $('main').on('click', '#restart-quiz', function(event) {
        console.log('does anything work?');
        event.preventDefault();
        store.score = 0;
        renderHomePage();
    });

    console.log('startPageButton() ran');
}



// submitAnswer needs to send us to our next question page, by adding to the counter value.
// also needs to compare the correct answer
// access correct answer with store.questions[0].correctAnswer

function submitAnswer() {
    $('main').on('submit', '#js-question-form', function(event) {
        event.preventDefault();
        let currentQuestion = store.questions[store.questionNumber];

        if ($('input:checked').val() !== undefined) {

            if (parseInt(event.target.answers.value) === currentQuestion.correctAnswer) {
                store.score++;
            } else {
                alert(`Sorry, wrong answer, the correct answer was ${currentQuestion.correctAnswer}`);

            }
            // cycle through questions // RENDER AFTER CHANGING STORE!
            store.questionNumber += 1;

            if (store.questionNumber < 5) {
                renderQuestionPage();
            }
            if (store.questionNumber === 5) {
                store.quizStarted = false;
                store.questionNumber = 0; // <--- clear out question number see if that's affecting the button.
                renderResultsPage();
            };
        } else {
            alert('Sorry you have to at least try!');
        }

        // $('input[name=answers]:checked').val();
        console.log('submitAnswer() ran');
    });
}



function handleQuiz() {
    // needs to render our home page, and activate all of our other functions.
    renderMain();
    generateHomePageHTML();
    generateQuestionHTML();
    startPageButton();
    submitAnswer();
    restartPageButton();
    nextQuestionButton();
}

$(handleQuiz);