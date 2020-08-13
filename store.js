'use strict';
/**
 * Example store structure
 */

// 5 or more questions are required
// const questions = [




// quizStarted: false,
// questionNumber: 0,
// score: 0;


const store = {
    // 5 or more questions are required
    questions: [{

            name: 'How many points are awarded for a touchdown in NFL football?',
            answers: [
                1,
                2,
                3,
                6,
            ],
            correctAnswer: 6,
        },
        {
            name: 'How many points are awarded for a layup in NBA basketball?',
            answers: [
                1,
                2,
                3,
                4,
            ],
            correctAnswer: 2,
        },
        {
            name: 'How many points are awarded for a fieldgoal in NFL football?',
            answers: [
                1,
                2,
                3,
                6,
            ],
            correctAnswer: 3,
        },
        {
            name: 'How many minutes are in an NBA quarter?',
            answers: [
                12,
                6,
                30,
                60,
            ],
            correctAnswer: 12,
        },
        {
            name: 'How many points are awarded for returning a missed point after attempt to the opposing teams endzone',
            answers: [
                1,
                2,
                3,
                6,
            ],
            correctAnswer: 2,
        },
        {
            name: 'How many quarters are in an NBA game',
            answers: [
                4,
                6,
                2,
                3,
            ],
            correctAnswer: 4
        },
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0

};

// let questionCount = store.questionNumber;
let currentQuestion = store.questions[store.questionCount];

console.log(store.questionNumber);

console.log(store.questions[store.questionNumber].name);
// console.log(currentQuestion.name); <--- DOESN'T WORK
console.log(store.questions[store.questionNumber]);