import * as api from '../../api/api'

/*
* grab everything from the backend in one go
*
* */
export function initialiseAll({dispatch}) {

  const quizzes = dispatch('fetchQuizzes');
  const questions = dispatch('fetchQuestions');
  const answers = dispatch('fetchAnswers');

  return Promise.all([quizzes, questions, answers]);
}

/*
* grab the quizzes (owned by current user) from the backend, then commit the setQuizzes mutation
*
* */
export function fetchQuizzes({commit}) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.fetchQuizzes();
      console.log("fetch quizzes: ");
      console.log(response.data);

      commit('setQuizzes', response.data);
      commit('user/setQuizzes', response.data, {root: true});
      resolve();
    } catch (e) {
      console.log("fetch quizzes error ");
      console.log(e);
      reject(e);
    }
  });
}

/*
* grab the questions (owned by current user) from the backend, then commit the setQuestions mutation
* -- modified --
* */
export function fetchQuestions({commit}) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.fetchQuestions();
      console.log("fetch questions: ");
      console.log(response.data);
      commit('setQuestions', response.data);
      resolve();
    } catch (e) {
      console.log("Error while fetching questions API: " + e.toString());
      console.log(e);
      reject(e);
    }
  });
}

/*
* grab the answers (owned by current user) from the backend, then commit the setQuizzes mutation
* -- modified --
* */
export function fetchAnswers({commit}) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.fetchAnswers();
      commit('setAnswers', response);
      resolve();
    } catch (e) {
      console.log("Error while fetching answers API: " + e);
      reject(e);
    }
  });
}

// -- created --
export function createAnswer({commit}, payload) {

  let newAnswer = payload.answer;
  let questionId = payload.questionId;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.addAnswer(newAnswer);

      let answerId;

      if (response.status === 200) {
        answerId = response.data;
        newAnswer.id = answerId;

        commit('addAnswer', {questionId: questionId, answer: newAnswer});
      }

    } catch (e) {
      console.log("Error while adding an answer: " + e);
      reject(e);
    }
  });
}

// -- created --
export function deleteAnswer({commit}, payload) {

  let answerId = payload.answerId;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.deleteAnswer(answerId);

      if (response.status === 200) {
        commit('deleteAnswer', {questionId: questionId, answerId: answerId});
      }

    } catch (e) {
      console.log("Error while deleting an answer: " + e);
      reject(e);
    }
  });
}

// -- created --
export function updateAnswers({commit}, payload) {

  let answers = payload.answers;

  return new Promise(async (resolve, reject) => {
    try {
      await api.updateAnswers(answers);

      commit('updateAnswers', {answers});

    } catch (e) {
      console.log("Error while updating an answer: " + e);
      reject(e);
    }
  });
}

/*
* send a newly created quiz to the backend in order to be stored
*
* */
export function createQuiz({commit}, newQuiz) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.createQuiz(newQuiz);
      commit("createQuiz", response.data);
      commit("user/createQuiz", response.data.id, {root: true});
      resolve(response.data.id);
    } catch (e) {
      console.log("Error while creating quiz: " + e);
      console.log(e);
      reject(e);
    }
  });
}

/*
* send a modified, but existing quiz to the backend in order to be updated
*
* */
export function updateQuiz({commit}, updatedQuiz) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.updateQuiz(updatedQuiz);
      commit('updateQuiz', response.data);
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}


/*
* send an id to the backend in order to delete the corresponding quiz.
*
* */
export function deleteQuiz({commit}, deletedId) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.deleteQuiz(deletedId);
      commit('deleteQuiz', response.data);
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

/*
* send a newly created question to the backend in order to be stored
* -- modified --
* */
export function createQuestion({commit}, payload) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.createQuestion(payload.quizId, payload.newQuestion);
      commit('createQuestion', {quizId: payload.quizId, newQuestion: {...payload.newQuestion, id: response.data.id}});
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

/*
* send a modified, but existing quiz to the backend in order to be updated
* -- modified --
* */
export function updateQuestion({commit}, payload) {

  let questionId = payload.questionId;
  let updatedQuestion = payload.updatedQuestion;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.updateQuestion(questionId, updatedQuestion);

      if (response.status === 200) {
        commit('updateQuestion', {questionId: questionId, updatedQuestion: updatedQuestion});
      }

      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

/*
* send an id to the backend in order to delete the corresponding question.
* -- modified --
* */
export function deleteQuestion({commit}, payload) {

  let questionIdToDelete = payload.deletedQuestionId;
  let quizIdToDelete = payload.quizId;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.deleteQuestion(questionIdToDelete);

      if (response.status === 200) {
        commit('deleteQuestion', {quizId: quizIdToDelete, questionId: questionIdToDelete});
      }

      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

/*
* reset the state of the module, including the nested results module.
*
* */
export function reset({dispatch, commit}) {
  dispatch('results/reset');
  commit('reset');
}
