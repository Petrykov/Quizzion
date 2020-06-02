import * as api from '../../api/api'

/*
* grab everything from the backend in one go
*
* */
export function initialiseAll({ dispatch }) {
    dispatch('fetchQuizzes');
    dispatch('fetchQuestions');
    dispatch('fetchAnswers');
}

/*
* grab the quizzes (owned by current user) from the backend, then commit the setQuizzes mutation
*
* */
export function fetchQuizzes({ commit }) {
    api.fetchQuizzes(
        //handle success
        ( response ) => commit('setQuizzes', response.data),
        //handle failure
        (/* error */) => {}//do sth
    );
}

/*
* grab the questions (owned by current user) from the backend, then commit the setQuestions mutation
*
* */
export function fetchQuestions({ commit }) {
    api.fetchQuestions(
        //handle success
        ( response ) => commit('setQuestions', response.data),
        //handle failure
        (/* error */) => {}//do sth
    );
}

/*
* grab the answers (owned by current user) from the backend, then commit the setQuizzes mutation
*
* */
export function fetchAnswers({ commit }) {
    api.fetchAnswers(
        //handle success
        ( response ) => commit('setAnswers', response.data),
        //handle failure
        (/* error */) => {}//do sth
    );
}

/*
* send a newly created quiz to the backend in order to be stored
*
* */
export function createQuiz({ commit }, newQuiz) {
    api.createQuiz(
        newQuiz,
        //handle success
        (/* response */) => commit('createQuiz', newQuiz),
        //handle failure
        (/* error */) => {}//do sth
    );
}

/*
* send a modified, but existing quiz to the backend in order to be updated
*
* */
export function updateQuiz({ commit }, updatedQuiz) {
    api.updateQuiz(
        updatedQuiz,
        //handle success
        (/* response */) => commit('updateQuiz', updatedQuiz),
        //handle failure
        (/* error */) => {}//do sth
    );
}


/*
* send an id to the backend in order to delete the corresponding quiz.
*
* */
export function deleteQuiz({ commit }, deletedId) {
    api.deleteQuiz(
        deletedId,
        //handle success
        (/* response */) => commit('deleteQuiz', deletedId),
        //handle failure
        (/* error */) => {}//do sth
    );
}

/*
* send a newly created question to the backend in order to be stored
*
* */
export function createQuestion({ commit }, payload) {
    api.createQuestion(
        payload.quizId,
        payload.newQuestion,
        //handle success
        (/* response */) => commit('createQuestion', payload),
        //handle failure
        (/* error */) => {}//do sth
    );
}

/*
* send a modified, but existing quiz to the backend in order to be updated
*
* */
export function updateQuestion({ commit }, payload) {
    api.updateQuestion(
        payload.quizId,
        payload.updatedQuestion,
        //handle success
        (/* response */) => commit('updateQuestion', payload),
        //handle failure
        (/* error */) => {}//do sth
    );
}

/*
* send an id to the backend in order to delete the corresponding question.
*
* */
export function deleteQuestion({ commit }, payload) {
    api.deleteQuestion(
        payload.quizId,
        payload.deletedQuestionId,
        //handle success
        (/* response */) => commit('deleteQuestion', payload),
        //handle failure
        (/* error */) => {}//do sth
    );
}

/*
* reset the state of the module, including the nested results module.
*
* */
export function reset({ dispatch, commit }) {
    dispatch('results/reset');
    commit('reset');
}
