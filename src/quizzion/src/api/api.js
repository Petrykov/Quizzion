// import axios or use this.$axios?

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
    // axios.post(`${apiUrl}/user/login`, { credentials }).then(cb).catch(errorCb);
}

export function participate(displayName, cb, errorCb) {
    // axios.post(`${apiUrl}/user/participate`, { displayName }).then(cb).catch(errorCb);
}

export function fetchQuizzes(cb, errorCb) {
    // axios.get(`${apiUrl}/quizzes`).then(cb).catch(errorCb);
}

export function fetchQuestions(cb, errorCb) {
    // axios.get(`${apiUrl}/questions`).then(cb).catch(errorCb);
}

export function fetchAnswers(cb, errorCb) {
    // axios.get(`${apiUrl}/questions`).then(cb).catch(errorCb);
}

export function createQuiz(newQuiz, cb, errorCb) {
    // axios.post(`${apiUrl}/quizzes`, { newQuiz }).then(cb).catch(errorCb);
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
