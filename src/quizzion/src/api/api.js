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
  axios.defaults.headers.common['authorization'] = store.state.user.token;

  return axios.get(`${apiUrl}/quizzes/all`);
}

// -- modified --
export function fetchQuestions() {
  return axios.get(`${apiUrl}/question`);
}

// -- modified --
export function fetchAnswers() {
  return axios.get(`${apiUrl}/answer`);
}

export function createQuiz(newQuiz) {
  // return axios.post(`${apiUrl}/quizzes`, {newQuiz});

  const dummy = {
    data: {
      ...newQuiz,
      id: 'qwe1231as'
    }
  };

  return dummy;
}

export function updateQuiz(updatedQuiz) {
  // return axios.put(`${apiUrl}/quizzes/${updatedQuiz.id}`, { updatedQuiz });
}

export function deleteQuiz(deletedId) {
  // return axios.delete(`${apiUrl}/quizzes/${deletedId}`);
}

// -- modified --
export function createQuestion(quizId, newQuestion) {
  axios.defaults.headers.common['authorization'] = store.state.user.token;
  return axios.post(`${apiUrl}/quizzes/${quizId}/question`, {...newQuestion});
}

// -- modified --
export function updateQuestion(questionId, updatedQuestion) {
  return axios.put(`${apiUrl}/question/${questionId}`, {...updatedQuestion});
}

// -- modified --
export function deleteQuestion(questionId) {
  return axios.delete(`${apiUrl}/question/${questionId}`);
}

// -- created
export function addAnswerToQuestion(questionId, answerId) {
  return axios.put(`${apiUrl}/question/${questionId}/add/${answerId}`);
}

// -- created --
export function addAnswer(newAnswer) {
  return axios.post(`${apiUrl}/answer`, {...newAnswer});
}

// -- created --
export function deleteAnswer(answerId) {
  return axios.delete(`${apiUrl}/answer/${answerId}`);
}

// -- created --
export function updateAnswers(answers) {

  return axios.all(
    answers.map((answer) => {
      axios.put(`${apiUrl}/answer/${answer.id}`);
    })
  )
}


export function submitAnswerForm(quizId, answers) {
  // return axios.post(`${apiUrl}/quizzes/${quizId}/submit`, { answers });
}

export function fetchResults() {
  // return axios.get(`${apiUrl}/results`)
}
