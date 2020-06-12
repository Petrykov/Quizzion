import initialState from "./state";

/*
* payload should contain an array of quizzes
*
* */
export function setQuizzes(state, quizzes) {
  // console.log("Quizzes: ");
  // console.log(quizzes.length);
  state.quizzes = quizzes;
}

/*
* payload should contain an array of questions
* -- modified --
* */
export function setQuestions(state, questions) {
  state.questions = questions;
}

/*
* payload should contain an array of answers
* -- modified --
* */
export function setAnswers(state, answers) {
  state.answers = answers.data;
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
* -- modified --
* */
export function createQuestion(state, {quizId, newQuestion}) {

  let quiz = state.quizzes.find(quiz => quiz.id === quizId);

  quiz.questions.push(newQuestion.id);
  state.questions.push(newQuestion);
}

/* +
* payload should contain the
* -- modified --
* */
export function updateQuestion(state, {questionId, updatedQuestion}) {

  // title: this.question.title,
  //   description: this.question.description,
  //   image: this.question.image,
  //   time: this.question.time,
  //   answers: answersIdList

  state.questions.map((question, index) => {
    if (question.id === questionId) {
      // console.log(state.questions[index].title +" [=] "+ updatedQuestion.title);
      state.questions[index].title = updatedQuestion.title;
      state.questions[index].description = updatedQuestion.description;
      state.questions[index].time = updatedQuestion.time;
      state.questions[index].answers = updatedQuestion.answers;
    }
  })
}

/* +
* payload should contain the full object that was edited, in proper format, as well as the id of the target quiz
* -- modified --
* */
export function deleteQuestion(state, {quizId, questionId}) {

  let quiz = state.quizzes.find(quiz => quiz.id === quizId);

  quiz.questions = quiz.questions.filter(id => id !== questionId);
  state.questions = state.questions.filter(question => question.id !== questionId);
}

/* +
* -- modified --
*/
export function addAnswer(state, {questionId, answer}) {

  let question = state.questions.find(question => question.id === questionId);

  question.answers.push(answer.id.id);
  state.answers.push(answer);
}

/* +
* -- modified
*/
export function deleteAnswer(state, {questionId, answerId}) {

  let question = state.questions.find(question => question.id === questionId);

  question.answers.map((answer, index) => {
    if (answer === answerId) {
      question.answers.splice(index, 1);
    }
  });
}

/* +
* payload should contain the
*
* */
export function updateAnswers(state, {answers}) {

  answers.map((answer, index) => {
    if (answer.id === answers[index].id) {
      state.answers[index] = answer;
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
