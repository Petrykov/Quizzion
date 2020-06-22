import axios from 'axios'
import md5 from 'md5'
import store from '../store'
import config from './../config/config'

const apiUrl = process.env.DEV ? config.backendPath + '/api'  : '';

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



export function login(credentials) {
  return axios.post(`${apiUrl}/user/login`, {
    username: credentials.username,
    password: md5(credentials.password)
  });
}

export function logout() {
  return axios.delete(`${apiUrl}/user/logout`);
}


export function join({quizId, name}) {
  return axios.post(`${apiUrl}/respondent/join/${quizId}`, {name});
}

export function fetchQuizzes() {
  axios.defaults.headers.common['authorization'] = store.state.user.token; //set default token after login

  return axios.get(`${apiUrl}/quizzes/all`);
}

export async function fetchInvitedQuiz(quizId) {
  return axios.get(`${apiUrl}/quizzes/${quizId}/invite`);
}

// -- modified --
export function fetchQuestions() {
  return axios.get(`${apiUrl}/question`);
}

// -- modified --
export function fetchAnswers() {
  return axios.get(`${apiUrl}/answer`);
}

export function startQuiz(payload) {
  return axios.post(`${apiUrl}/quizzes/:quizId/start`, payload);
}

export function createQuiz(newQuiz) {
  return axios.post(`${apiUrl}/quizzes`, {...newQuiz});
}

export function updateQuiz(updatedQuiz) {
  return axios.put(`${apiUrl}/quizzes/${updatedQuiz.id}/edit`, {...updatedQuiz, label: updatedQuiz.color});
}

export function deleteQuiz(deletedId) {
  return axios.delete(`${apiUrl}/quizzes/${deletedId}`);
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
      axios.put(`${apiUrl}/answer/${answer.id}`,{...answer});
    })
  )
}


export function submitAnswer({quizId, answer}) {
  return axios.post(`${apiUrl}/respondent/${quizId}/answer`, answer );
}

export function fetchRespondentResult({quizId, id}) {
  return axios.get(`${apiUrl}/${quizId}/result/respondent/${id}`);
}

export function fetchResults(quizId) {
  return axios.get(`${apiUrl}/results/${quizId}`)
}
