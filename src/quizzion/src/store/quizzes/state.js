export default function () {
    return {
        quizzes: [],
        questions: [],
        answers: [],
    }
}


/*
*
* Example of what a bunch of quizzes will look like
*
* */

export let quizzesMock = {
    quizzes: [

    ],
    questions: [
        {
            id: 'dr5rty',
            number:1,
            title: 'How many rings are on the Olympic flag?',
            description: '',
            image: 'https://media.newyorker.com/photos/5e791a514f53b7000832d44f/master/pass/Thomas-Olympics.jpg',
            time: 30,
            answers: ['65ry5', 'ihy6', 'y5r5', 'k98nn']
        },
        {
            id: 'dt6r',
            number:2,
            title: 'What are the main colours on the flag of spain?',
            description: 'Hint: You might be able to tell from this image:',
            image: 'https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/23/08/01/shutterstock-104644850.jpg',
            time: 15,
            answers: ['dudu7t', 'jsdiu', '87ydj', 'dhi8d']
        },
        {
            id: 'ft6t',
            number:3,
            title: 'What is the name of this symbol?',
            description: 'It is used to indicate a new paragraph.',
            image: 'https://i.pinimg.com/236x/6d/c2/67/6dc267235633a76c5d98d4b968fdb593--self-publishing-how-to-get-rid.jpg',
            time: 15,
            answers: ['jso45h', 'ehiruh', 'hu7tuh', 'o84y4']
        }
    ],
    answers: [
        {
            id: '65ry5',
            label: 'None',
            questionId:'dr5rty',
            correct: false,

        },
        {
            id: 'ihy6',
            label: '4',
          questionId:'dr5rty',
            correct: false
        },
        {
            id: 'y5r5',
            label: '5',
          questionId:'dr5rty',
            correct: true
        },
        {
            id: 'k98nn',
            label: '7',
          questionId:'dr5rty',
            correct: false
        },
        {
            id: 'dudu7t',
            label: 'Black and yellow',
          questionId:'dt6r',
            correct: false
        },
        {
            id: 'jsdiu',
            label: 'Green and white',
          questionId:'dt6r',
            correct: false
        },
        {
            id: '87ydj',
            label: 'Blue and white',
          questionId:'dt6r',
            correct: false
        },
        {
            id: 'dhi8d',
            label: 'Red and yellow',
          questionId:'dt6r',
            correct: true
        },
        {
            id: 'jso45h',
            label: 'Fermata',
          questionId:'ft6t',
            correct: true
        },
        {
            id: 'ehiruh',
            label: 'Pilcrow',
          questionId:'ft6t',
            correct: true
        },
        {
            id: 'hu7tuh',
            label: 'Interrobang',
          questionId:'ft6t',
            correct: false
        },
        {
            id: 'o84y4',
            label: 'Biltong',
          questionId:'ft6t',
            correct: false
        },
    ]
};
