import axios from 'axios'
import md5 from 'md5'
import store from '../store'

const apiUrl = process.env.DEV ? 'http://localhost:3000/api' : '';

/*
*
* api.js
*
* This file abstracts all the api calls to our backend.
* (Could be split up in multiple components, in line with Vuex modules)
*
* The main reasons for this are the improvements in maintainability and testing.
*
// not updated * Each request takes a callback (cb) for a successful request
// *       and an additional callback (errorCb) for failed requests.
// *       The approach is subject to change.
*
* These requests will be caught by our own backend, which might in turn make other requests to the Parantion backend.
*
* */


function timeout(res, ms) {
  return new Promise(resolve => setTimeout(() => resolve(res), ms));
}

export function login(credentials) {
  return axios.post(`${apiUrl}/user/login`, {
    username: credentials.username,
    password: md5(credentials.password)
  });

  // const dummy = {
  //   data: [
  //     {
  //       uh: 'userToken',
  //       username: 'username',
  //       firstname: 'userFirstName',
  //       lastname: 'userLastName',
  //       email: 'userEmail'
  //     }
  //   ]
  // }

  // return dummy;
  // return timeout(dummy, 1000);
}

export function logout() {
  // return axios.delete(`${apiUrl}/user/logout`);
}

export function participate(displayName) {
  // return axios.post(`${apiUrl}/user/participate`, { displayName });

  const dummy = {
    data: {
      uh: 'participanttoken',
      displayName
    }
  };
  return dummy;
}

export function fetchQuizzes() {
  axios.defaults.headers.common['authorization'] = store.state.user.token; //set default token after login

  return axios.get(`${apiUrl}/quizzes/all`);
}

export function fetchQuestions() {
  // return axios.get(`${apiUrl}/questions`);

  const dummy = {
    data:
      [
        {
          id: 'dr5rty',
          number: 1,
          title: 'How many rings are on the Olympic flag?',
          description: '',
          image: 'https://media.newyorker.com/photos/5e791a514f53b7000832d44f/master/pass/Thomas-Olympics.jpg',
          time: 30,
          answers: ['65ry5', 'ihy6', 'y5r5', 'k98nn']
        },
        {
          id: 'dt6r',
          number: 2,
          title: 'What are the main colours on the flag of spain?',
          description: 'Hint: You might be able to tell from this image:',
          image: 'https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/23/08/01/shutterstock-104644850.jpg',
          time: 15,
          answers: ['dudu7t', 'jsdiu', '87ydj', 'dhi8d']
        },
        {
          id: 'ft6t',
          number: 3,
          title: 'What is the name of this symbol?',
          description: 'It is used to indicate a new paragraph.',
          image: 'https://i.pinimg.com/236x/6d/c2/67/6dc267235633a76c5d98d4b968fdb593--self-publishing-how-to-get-rid.jpg',
          time: 15,
          answers: ['jso45h', 'ehiruh', 'hu7tuh', 'o84y4']
        }
      ]

  };

  return dummy;
}

export function fetchAnswers() {
  // return axios.get(`${apiUrl}/questions`);

  const dummy = {
    data: [{
      id: '65ry5',
      label: 'None',
      questionId: 'dr5rty',
      correct: false,

    },
      {
        id: 'ihy6',
        label: '4',
        questionId: 'dr5rty',
        correct: false
      },
      {
        id: 'y5r5',
        label: '5',
        questionId: 'dr5rty',
        correct: true
      },
      {
        id: 'k98nn',
        label: '7',
        questionId: 'dr5rty',
        correct: false
      },
      {
        id: 'dudu7t',
        label: 'Black and yellow',
        questionId: 'dt6r',
        correct: false
      },
      {
        id: 'jsdiu',
        label: 'Green and white',
        questionId: 'dt6r',
        correct: false
      },
      {
        id: '87ydj',
        label: 'Blue and white',
        questionId: 'dt6r',
        correct: false
      },
      {
        id: 'dhi8d',
        label: 'Red and yellow',
        questionId: 'dt6r',
        correct: true
      },
      {
        id: 'jso45h',
        label: 'Fermata',
        questionId: 'ft6t',
        correct: true
      },
      {
        id: 'ehiruh',
        label: 'Pilcrow',
        questionId: 'ft6t',
        correct: true
      },
      {
        id: 'hu7tuh',
        label: 'Interrobang',
        questionId: 'ft6t',
        correct: false
      },
      {
        id: 'o84y4',
        label: 'Biltong',
        questionId: 'ft6t',
        correct: false
      }]
  };

  return dummy;
}

export function createQuiz(newQuiz) {
  return axios.post(`${apiUrl}/quizzes`, {...newQuiz});
}

export function updateQuiz(updatedQuiz) {
  // return axios.put(`${apiUrl}/quizzes/${updatedQuiz.id}`, { updatedQuiz });
}

export function deleteQuiz(deletedId) {
  // return axios.delete(`${apiUrl}/quizzes/${deletedId}`);
}

export function createQuestion(quizId, newQuestion) {
  // return axios.post(`${apiUrl}/quizzes/${quizId}/questions`, { newQuestion });
}

export function updateQuestion(quizId, updatedQuestion) {
  // return axios.put(`${apiUrl}/quizzes/${quizId}/questions/${updatedQuestion.id}`, { updatedQuestion });
}

export function deleteQuestion(quizId, deletedQuestionId) {
  // return axios.delete(`${apiUrl}/quizzes/${quizId}/questions/${deletedQuestionId}`);
}

export function submitAnswerForm(quizId, answers) {
  // return axios.post(`${apiUrl}/quizzes/${quizId}/submit`, { answers });
}

export function fetchResults() {
  // return axios.get(`${apiUrl}/results`)
}
