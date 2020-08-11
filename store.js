'use strict';
/**
 * Example store structure
 */
const store = {
    // 5 or more questions are required
    questions: [{
            question: 'How many points are awarded for a touchdown in NFL football?',
            answers: [
                1,
                2,
                3,
                6,
            ],
            correctAnswer: 6,
        },
        {
            question: 'How many points are awarded for a layup in NBA basketball?',
            answers: [
                1,
                2,
                3,
                4,
            ],
            correctAnswer: 2,
        },
        {
            question: 'How many points are awarded for a fieldgoal in NFL football?',
            answers: [
                1,
                2,
                3,
                6,
            ],
            correctAnswer: 3,
        },
        {
            question: 'How many minutes are in an NBA quarter?',
            answers: [
                '12 minutes',
                '6 minutes',
                '30 minutes',
                '1 hours',
            ],
            correctAnswer: '12 minutes',
        },
        {
            question: 'How many points are awarded for returning a missed point after attempt to the opposing teams endzone',
            answers: [
                1,
                2,
                3,
                6,
            ],
            correctAnswer: 2,
        },
        {
            question: 'How many quarters are in an NBA game'
            answers: [
                4,
                6,
                2,
                3,
            ],
            correctAnswer: 4,
        },
    ],


    quizStarted: false,
    questionNumber: 0,
    score: 0
};