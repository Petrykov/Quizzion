import * as api from '../../api/api';

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
  return new Promise(async(resolve, reject) => {
    try {
      const response = await api.fetchQuizzes();
      commit('setQuizzes', response.data);
      commit('user/setQuizzes', response.data, {root: true});
      resolve();
    } catch (e) {
      console.log('fetch quizzes error ' + e);
      reject(e);
    }
  });
}

export function fetchInvitedQuiz({commit}, quizId) {
  return new Promise(async(resolve, reject) => {
    try {
      const response = await api.fetchInvitedQuiz(quizId);

      commit('setQuizzes', [response.data.quiz]);
      commit('setQuestions', response.data.questions);
      commit('setAnswers', response.data.answers);

      resolve();
    } catch (e) {
      console.log('fetch quiz error ');
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
  return new Promise(async(resolve, reject) => {
    try {
      const response = await api.fetchQuestions();
      commit('setQuestions', response.data);
      resolve();
    } catch (e) {
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
  return new Promise(async(resolve, reject) => {
    try {
      const response = await api.fetchAnswers();
      commit('setAnswers', response.data);
      resolve();
    } catch (e) {
      console.log('Error while fetching answers API: ' + e);
      reject(e);
    }
  });
}

//-- created --
export function createAnswer({commit}, payload) {
  const newAnswer = payload.answer;
  const questionId = payload.questionId;

  return new Promise(async(resolve, reject) => {
    try {
      const response = await api.createAnswer(newAnswer);

      if (response.status === 201) {
        newAnswer.id = response.data.id;
        await api.addAnswerToQuestion(questionId, response.data.id);
        commit('createAnswer', {questionId: questionId, answer: newAnswer});
        resolve();
      }
    } catch (e) {
      console.log('Error while adding an answer: ' + e);
      reject(e);
    }
  });
}

//-- created --
export function deleteAnswer({commit}, payload) {
  const answerId = payload.answerId;
  const questionId = payload.questionId;

  return new Promise(async(resolve, reject) => {
    try {
      const response = await api.deleteAnswer(answerId);

      if (response.status === 200) {
        commit('deleteAnswer', {questionId: questionId, answerId: answerId});
        resolve();
      }
    } catch (e) {
      console.log('Error while deleting an answer: ' + e);
      reject(e);
    }
  });
}

//-- created --
export function updateAnswers({commit}, payload) {
  const answers = payload.answers;

  return new Promise(async(resolve, reject) => {
    try {
      await api.updateAnswers(answers);

      commit('updateAnswers', {answers});
      resolve();
    } catch (e) {
      console.log('Error while updating an answer: ' + e);
      reject(e);
    }
  });
}


export function addAnswerToTheQuestion({commit}, payload) {
  return new Promise(async(resolve, reject) => {
    try {
      await api.addAnswerToQuestion();
    } catch (err) {
      console.log('Error while adding answer to the question: ' + err);
    }
  });
}

/*
* send a newly created quiz to the backend in order to be stored
*
* */
export function createQuiz({commit}, newQuiz) {
  return new Promise(async(resolve, reject) => {
    try {
      const response = await api.createQuiz(newQuiz);

      const color = newQuiz.label;
      const id = response.data.tn;
      delete newQuiz.label;
      commit('createQuiz', {...newQuiz, id, color});
      commit('user/createQuiz', id, {root: true});
      resolve(id);
    } catch (e) {
      console.log('Error while creating quiz: ' + e);
      reject(e);
    }
  });
}

/*
* send a modified, but existing quiz to the backend in order to be updated
*
* */
export function updateQuiz({commit}, updatedQuiz) {
  return new Promise(async(resolve, reject) => {
    try {
      await api.updateQuiz(updatedQuiz);
      commit('updateQuiz', updatedQuiz);
      resolve();
    } catch (e) {
      console.log('Error while updating the quiz: ' + e);
      reject(e);
    }
  });
}

export function startQuiz(context, quizId) {
  return new Promise(async(resolve, reject) => {
    try {
      const payload = context.getters['getFullQuizPackage'](quizId);

      await api.startQuiz(payload);

      context.commit('setStored', quizId);
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export function activateQuiz({getters, commit}, quiz) {
  return new Promise(async(resolve, reject) => {
    try {
      const activatedQuiz = {...quiz};
      activatedQuiz.active = true;

      await api.updateQuiz(activatedQuiz);
      commit('activateQuiz', quiz.id);
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export function deactivateQuiz({getters, commit}, quiz) {
  return new Promise(async(resolve, reject) => {
    try {
      const deactivatedQuiz = {...quiz};
      deactivatedQuiz.active = false;
      deactivatedQuiz.stored = false;

      await api.updateQuiz(deactivatedQuiz);
      commit('deactivateQuiz', quiz.id);
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
  return new Promise(async(resolve, reject) => {
    try {
      await api.deleteQuiz(deletedId);
      commit('deleteQuiz', deletedId);
      commit('user/deleteQuizFromUser', deletedId, {root: true});
      resolve(deletedId);
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
  return new Promise(async(resolve, reject) => {
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
  const questionId = payload.questionId;
  const updatedQuestion = payload.updatedQuestion;

  return new Promise(async(resolve, reject) => {
    try {
      await api.updateQuestion(questionId, updatedQuestion);

      commit('updateQuestion', {questionId: questionId, updatedQuestion: updatedQuestion});

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
  const questionIdToDelete = payload.deletedQuestionId;
  const quizIdToDelete = payload.quizId;

  return new Promise(async(resolve, reject) => {
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

export function submitAnswer({commit}, payload) {
  return new Promise(async(resolve, reject) => {
    try {
      await api.submitAnswer(payload);
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
