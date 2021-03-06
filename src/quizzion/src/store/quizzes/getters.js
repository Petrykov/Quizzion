/*
* supply an id to retrieve the full objects out of a collection
*
* usage: $store.getters['quizzes/getQuizById'](id)
*
* */


export function getQuizById(state) {
  return function(id) {
    return state.quizzes.find(quiz => quiz.id === id);
  };
}

export function getQuestionById(state) {
  return function(id) {
    return state.questions.find(question => question.id === id);
  };
}

export function getAnswerById(state) {
  return function(id) {
    return state.answers.find(answer => answer.id === id);
  };
}

export function getAnswerLabelById(state) {
  return function(id) {
    return state.answers.find(answer => answer.id === id).label;
  };
}

export function getNextQuestionId(state, getters) {
  return function(quizId) {
    return function(questionId) {
      const quiz = getters.getQuizById(quizId);
      let index = quiz.questions.findIndex(id => id === questionId);
      const nextId = quiz.questions[++index];
      return nextId !== undefined ? nextId : false;
    };
  };
}

export function getAnswers(state) {
  return function(idList) {
    const listToReturn = [];

    for (let i = 0; i < state.answers.length; i++) {
      for (let j = 0; j < idList.length; j++) {
        if (state.answers[i].id === idList[j]) {
          listToReturn.push(state.answers[i]);
        }
      }
    }

    return listToReturn;
  };
}

export function getQuestionTitleById(state) {
  return function(id) {
    for (let i = 0; i < state.questions.length; i++) {
      if (state.questions[i].id === id) {
        return state.questions[i].title;
      }
    }
  };
}


export function getQuestionsByQuizId(state, getters) {
  return function(quizId) {
    const questionIds = getters.getQuizById(quizId).questions;

    const questionObjects = [];
    questionIds.forEach((questionId) => {
      questionObjects.push(getters.getQuestionById(questionId));
    });

    return questionObjects;
  };
}

export function getAnswersByQuizId(state, getters) {
  return function(quizId) {
    const questions = getters.getQuestionsByQuizId(quizId);

    const answerIds = [];
    questions.forEach((question) => {
      question.answers.forEach((answerId) => {
        answerIds.push(answerId);
      });
    });

    const answerObjects = [];
    answerIds.forEach((answerId) => {
      const a = getters.getAnswerById(answerId);
      answerObjects.push(a);
    });

    return answerObjects;
  };
}

export function getFullQuizPackage(state, getters) {
  return function(quizId) {
    const quiz = getters.getQuizById(quizId);
    const questions = getters.getQuestionsByQuizId(quizId);
    const answers = getters.getAnswersByQuizId(quizId);

    return {quiz, questions, answers};
  };
}
