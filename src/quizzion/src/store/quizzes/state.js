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
        {
            id: 'g67yuhb',
            title: 'test quiz',
            description: 'mock quiz for demo',
            color: 'orange',
            logo: '',
            questions: ['dr5rty', 'dt6r', 'ft6t']
        },
        {
            id: 'fy5ryt',
            title: 'Pubquiz - Quarantine edition',
            description: 'another mock quiz for demo',
            color: 'purple',
            logo: '',
            questions: ['dr5rty', 'dt6r', 'ft6t']
        },
        {
            id: 'kh8yi7y',
            title: 'General knowledge',
            description: 'Random things you should know!',
            color: 'teal',
            logo: '',
            questions: ['dr5rty', 'dt6r', 'ft6t']
        }
    ],
    questions: [
        {
            id: 'dr5rty',
            title: 'How many rings are on the Olympic flag?',
            description: '',
            image: 'https://media.newyorker.com/photos/5e791a514f53b7000832d44f/master/pass/Thomas-Olympics.jpg',
            time: 30,
            answers: ['65ry5', 'ihy6', 'y5r5', 'k98nn']
        },
        {
            id: 'dt6r',
            title: 'What are the main colours on the flag of spain?',
            description: 'Hint: You might be able to tell from this image:',
            image: 'https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/23/08/01/shutterstock-104644850.jpg',
            time: 15,
            answers: ['dudu7t', 'jsdiu', '87ydj', 'dhi8d']
        },
        {
            id: 'ft6t',
            title: 'What is the name of this symbol?',
            description: 'It is used to indicate a new paragraph.',
            image: '',
            time: undefined,
            answers: ['jso45h', 'ehiruh', 'hu7tuh', 'o84y4']
        }
    ],
    answers: [
        {
            id: '65ry5',
            label: 'None',
            correct: false
        },
        {
            id: 'ihy6',
            label: '4',
            correct: false
        },
        {
            id: 'y5r5',
            label: '5',
            correct: true
        },
        {
            id: 'k98nn',
            label: '7',
            correct: false
        },
        {
            id: 'dudu7t',
            label: 'Black and yellow',
            correct: false
        },
        {
            id: 'jsdiu',
            label: 'Green and white',
            correct: false
        },
        {
            id: '87ydj',
            label: 'Blue and white',
            correct: false
        },
        {
            id: 'dhi8d',
            label: 'Red and yellow',
            correct: true
        },
        {
            id: 'jso45h',
            label: 'Fermata',
            correct: true
        },
        {
            id: 'ehiruh',
            label: 'Pilcrow',
            correct: true
        },
        {
            id: 'hu7tuh',
            label: 'Interrobang',
            correct: false
        },
        {
            id: 'o84y4',
            label: 'Biltong',
            correct: false
        },
    ]
};
