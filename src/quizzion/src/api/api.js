import axios from 'axios'
import md5 from 'md5'

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
* Each request takes a callback (cb) for a successful request
*       and an additional callback (errorCb) for failed requests.
*       The approach is subject to change.
*
* These requests will be caught by our own backend, which might in turn make other requests to the Parantion backend.
*
* */


export function login(credentials, cb, errorCb) {
  // axios.post(`${apiUrl}/user/login`, {
  //   username: credentials.username,
  //   password: md5(credentials.password)
  // }).then(cb).catch(errorCb);

  const response = {
    data: [
      {
        uh: 'userToken',
        firstname: 'userFirstName',
        lastname: 'userLastName',
        email: 'userEmail'
      }
    ]
  }

  cb(response);
}

export function participate(displayName, cb, errorCb) {
  // axios.post(`${apiUrl}/user/participate`, { displayName }).then(cb).catch(errorCb);
}

export function fetchQuizzes() {

  // return axios.get(`${apiUrl}/quizzes`);

  const response = {
    data: [
      {
        id: 'g67yuhb',
        owner: 'WandaE', //might want to make this the id
        title: 'test quiz',
        description: 'mock quiz for demo',
        color: '#ffa500',
        logo: '',
        questions: ['dr5rty'],
        active: false
      },
      {
        id: 'fy5ryt',
        owner: 'WandaE',
        title: 'Pubquiz - Quarantine edition',
        description: 'another mock quiz for demo',
        color: '#800080',
        logo: '',
        questions: ['ft6t'],
        active: false
      },
      {
        id: 'kh8yi7y',
        owner: 'WandaE',
        title: 'General knowledge',
        description: 'Random things you should know!',
        color: '#008080',
        logo: '',
        questions: ['dt6r'],
        active: false
      }
    ],
    status: 200,
    success: 'true'
  }

  return response;
}

export function fetchQuestions(cb, errorCb) {
  axios.get(`${apiUrl}/questions`).then(cb).catch(errorCb);
}

export function fetchAnswers(cb, errorCb) {
  axios.get(`${apiUrl}/questions`).then(cb).catch(errorCb);
}

export function createQuiz(newQuiz) {
  // return axios.post(`${apiUrl}/quizzes`, {newQuiz});

  const response = {
    data : {
      id: 'qwe1231as',
      owner: 'qweqwe',
      title: 'qweqwe',
      description: 'qweqweqwe',
      color: 'pink',
      logo: '',
      questions: [],
      active: false
    },
  }

  return response;
}

export function updateQuiz(updatedQuiz, cb, errorCb) {
  // axios.put(`${apiUrl}/quizzes/${updatedQuiz.id}`, { updatedQuiz }).then(cb).catch(errorCb);
}

export function deleteQuiz(deletedId, cb, errorCb) {
  // axios.delete(`${apiUrl}/quizzes/${deletedId}`).then(cb).catch(errorCb);
}

export function createQuestion(quizId, newQuestion, cb, errorCb) {
  // axios.post(`${apiUrl}/quizzes/${quizId}/questions`, { newQuestion }).then(cb).catch(errorCb);
}

export function updateQuestion(quizId, updatedQuestion, cb, errorCb) {
  // axios.put(`${apiUrl}/quizzes/${quizId}/questions/${updatedQuestion.id}`, { updatedQuestion }).then(cb).catch(errorCb);
}

export function deleteQuestion(quizId, deletedQuestionId, cb, errorCb) {
  // axios.delete(`${apiUrl}/quizzes/${quizId}/questions/${deletedQuestionId}`).then(cb).catch(errorCb);
}

export function submitAnswerForm(quizId, answers, cb, errorCb) {
  // axios.post(`${apiUrl}/quizzes/${quizId}/submit`, { answers }).then(cb).catch(errorCb);
}

export function fetchResults(cb, errorCb) {
  // axios.get(`${apiUrl}/results`).then(cb).catch(errorCb);
}
