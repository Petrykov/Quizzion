import initialState from "./state";

/*
* payload should contain an array of quizzes
*
* */
export function setQuizzes(state, quizzes) {
  state.quizzes = quizzes;
}

/*
* payload should contain an array of questions
*
* */
export function setQuestions(state, questions) {
  state.questions = questions;
}

/*
* payload should contain an array of answers
*
* */
export function setAnswers(state, answers) {
  state.answers = answers;
}

/*
* payload should contain the newly created quiz in proper format
*
* */
export function createQuiz(state, newQuiz) {
  state.quizzes.push(newQuiz);
}

/*
* payload should contain the full object that was edited, in proper format
*
* */
export function updateQuiz(state, {id, updatedQuiz}) {
  let index = state.quizzes.findIndex(quiz => quiz.id === id);
  state.quizzes[index] = updatedQuiz;
}

/*
* payload should contain only the id of the deleted quiz
*
* */
export function deleteQuiz(state, deletedId) {
  state.quizzes = state.quizzes.filter(quiz => quiz.id !== deletedId);
}

/* +
* payload should contain the newly created question in proper format, as well as the target quiz id
*
* */
export function createQuestion(state, {newQuestion, quizId}) {

  let quiz = state.quizzes.find(quiz => quiz.id === quizId);

  quiz.questions.push(newQuestion.id);
  state.questions.push(newQuestion);
}

/* +
* payload should contain the
*
* */
export function updateQuestion(state, {updatedQuestion, questionId, quizId}) {

  state.questions.map((question, index) => {
    if (question.id === questionId) {
      state.questions[index] = updatedQuestion;
    }
  })
}

/* +
* payload should contain the full object that was edited, in proper format, as well as the id of the target quiz
*
* */
export function deleteQuestion(state, {quizId, deletedQuestionId}) {
  let quiz = state.quizzes.find(quiz => quiz.id === quizId);
  quiz.questions = quiz.questions.filter(questionId => questionId !== deletedQuestionId);

  state.questions = state.questions.filter(question => question.id !== deletedQuestionId);
}

/* +
*
*/
export function addAnswer(state, {questionId, answer}) {
  let question = state.questions.find(question => question.id === questionId);
  question.answers.push(answer.id);
  state.answers.push(answer);
}

/* +
*
*/
export function deleteAnswer(state, {questionId, answerId}) {

  let question = state.questions.find(question => question.id === questionId);

  for (let i = 0; i < question.answers.length; i++) {
      if(question.answers[i] === answerId){
        question.answers.splice(i,1);
      }
  }
}

/* +
* payload should contain the
*
* */
export function updateAnswer(state, {answerId, changedAnswer}) {

  state.answers.map((answer, index) => {
    if (answer.id === answerId) {
      state.answers[index] = changedAnswer;
    }
  })
}

export function activateQuiz(state, activatedId) {
  let quiz = state.quizzes.find(quiz => quiz.id === activatedId);
  quiz.active = true;
}

export function reset(state) {
  Object.assign(state, initialState());
}

//mock only for dev
import {quizzesMock} from "./state";

export function mock(state) {
  state.quizzes = quizzesMock.quizzes;
  state.questions = quizzesMock.questions;
  state.answers = quizzesMock.answers;
}
