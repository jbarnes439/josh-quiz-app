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
            </div>`;
    console.log('generateHomePageHTML() ran');
}

// this needs to reference our questions in our store object array
function generateQuestionHTML() {
    // store.questions[counter] will give the question at counter value
    let currentQuestion = store.questions[store.questionNumber];

    return `
  <div class="container">
       <h1>${currentQuestion.name}</h1>
       <form id="js-question-form">
           <input type="radio" name="answers" value=${currentQuestion.answers[0]}>
           <label for="male">${currentQuestion.answers[0]}</label><br>
           <input type="radio"  name="answers" value=${currentQuestion.answers[1]}>
           <label for="female">${currentQuestion.answers[1]}</label><br>
           <input type="radio" name="answers" value=${currentQuestion.answers[2]}>
           <label for="other">${currentQuestion.answers[2]}</label><br>
           <input type="radio" name="answers" value=${currentQuestion.answers[3]}>
           <label for="other">${currentQuestion.answers[3]}</label><br>
           <button type="submit" id="give-answer">Send it!</button>
       </form>
       <quiz-place>Question number: ${store.questionNumber} out of 5.</quiz-place><br>
       <score-spot>You have gotten ${store.score} right!</score-spot>
     </div>`;

}

// function generateResultsPageHTML() {
//     return `    
//       <div class="container">               
//                 <form id="js-results-page">
//                     <button type="button" id="test-home">Try Again!</button>
//                 </form>
//                 <p>Congrats! you got ${store.score} correct</p>
//             </div>`;
// }

function generateResultsPageHTML() {
    return `    
      <div class="container">
                <h1>Thanks for taking our quiz!</h1>
                <form id="js-result-page">
                    <button type="button" id="restart-quiz">Take it Again!</button>
                </form>
                <div>Congrats! you got ${store.score} right.</div>
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

    let homePage = generateHomePageHTML();
    $('main').html(homePage);

    console.log('renderHomePage() ran');
}


function renderQuestionPage() {

    let questionHTML = generateQuestionHTML();
    $('main').html(questionHTML);
    console.log('renderQuestionPage() ran');
}

function renderResultsPage() {
    let resultsHTML = generateResultsPageHTML();
    $('main').html(resultsHTML);
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

// This needs to send us to our question page.

function startPageButton() {
    $('#start-quiz').on('click', event => {
        event.preventDefault();
        renderQuestionPage();

        console.log(store.questionNumber);
    });

    console.log('startPageButton() ran');
}


// Refuses to work, about to be the reason I rewrite this whole program.

function restartPageButton() {
    $('#restart-quiz').on('click', event => {
        console.log('does anything work?');
        event.preventDefault();
        renderHomePage();
    });

    console.log('startPageButton() ran');
}


// function testButton() {
//     $('#js-results-page').on('click', event => {
//         console.log('fingers crossed');
//         event.preventDefault();
//         $('main').remove();
//         renderHomePage();

//         console.log('test button ran');
//     });
// }


// submitAnswer needs to send us to our next question page, by adding to the counter value.
// also needs to compare the correct answer
// access correct answer with store.questions[0].correctAnswer

function submitAnswer() {
    $('main').on('submit', '#js-question-form', function(event) {
        event.preventDefault();
        let currentQuestion = store.questions[store.questionNumber];
        if (parseInt(event.target.answers.value) === currentQuestion.correctAnswer) {
            store.score++;
        } else {
            // store.score--;
            alert(`Sorry, wrong answer, the correct answer was ${currentQuestion.correctAnswer}`);
        }
        // cycle through questions // RENDER AFTER CHANGING STORE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        store.questionNumber += 1;

        if (store.questionNumber < 5) { // I feel like the button issue is derived from this block of code.
            renderQuestionPage(); // maybe rendering from this button is causing the other button to malfunction. 
        } else if (store.questionNumber === 5) {
            store.quizStarted = false;
            store.questionNumber = 0; // <--- clear out question number see if that's affecting the button.
            renderResultsPage();
        } else {
            renderHomePage();
        }

        // if answer selected = correct answer add to our store.score total. else 
        console.log(event.target.answers.value, currentQuestion.correctAnswer);
    });
    // needs to match 
    // $('input[name=answers]:checked').val();
    console.log('submitAnswer() ran');
}



function handleQuiz() {
    // needs to render our home page, and activate all of our other functions.
    renderMain();
    generateHomePageHTML();
    generateQuestionHTML();
    startPageButton();
    submitAnswer();
    // resultsPageButton();
    // testButton();
    restartPageButton();

    console.log('handleQuiz() ran');
}

$(handleQuiz);