import initialState from './state';

/*
* payload should contain an array of quizzes
*
* */
export function setQuizzes(state, quizzes) {
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
export function updateQuiz(state, updatedQuiz) {
  console.log('UPDATED QUIZ');
  console.log(updatedQuiz);
  state.quizzes = [
    ...state.quizzes.filter(quiz => quiz.id !== updatedQuiz.id),
    updatedQuiz];
}

/*
* payload should contain only the id of the deleted quiz
*
* */
export function deleteQuiz(state, deletedId) {
  state.quizzes = state.quizzes.filter(quiz => quiz.id !== deletedId);
}

export function setStored(state, quizId) {
  const quiz = {...state.quizzes.find(quiz => quiz.id === quizId), stored: true};
  state.quizzes = [
    ...state.quizzes.filter(quiz => quiz.id !== quizId),
    quiz];
}

/*+
* payload should contain the newly created question in proper format, as well as the target quiz id
* -- modified --
* */
export function createQuestion(state, {quizId, newQuestion}) {
  const quiz = state.quizzes.find(quiz => quiz.id === quizId);

  quiz.questions.push(newQuestion.id);
  state.questions.push(newQuestion);
}

/*+
* payload should contain the
* -- modified --
* */
export function updateQuestion(state, {questionId, updatedQuestion}) {
  state.questions.map((question, index) => {
    if (question.id === questionId) {
      state.questions[index].title = updatedQuestion.title;
      state.questions[index].description = updatedQuestion.description;
      state.questions[index].time = updatedQuestion.time;
      state.questions[index].answers = updatedQuestion.answers;
      state.questions[index].image = updatedQuestion.image;
    }
  });
}

/*+
* payload should contain the full object that was edited, in proper format, as well as the id of the target quiz
* -- modified --
* */
export function deleteQuestion(state, {quizId, questionId}) {
  const quiz = state.quizzes.find(quiz => quiz.id === quizId);

  quiz.questions = quiz.questions.filter(id => id !== questionId);
  state.questions = state.questions.filter(question => question.id !== questionId);
}

/*+
* -- modified --
*/
export function createAnswer(state, {questionId, answer}) {
  const question = state.questions.find(question => question.id === questionId);

  question.answers.push(answer.id);
  state.answers.push(answer);
}

/*+
* -- modified
*/
export function deleteAnswer(state, {questionId, answerId}) {
  const question = state.questions.find(question => question.id === questionId);

  question.answers.map((answer, index) => {
    if (answer === answerId) {
      question.answers.splice(index, 1);
    }
  });

  state.answers = state.answers.filter((answer) => answer.id !== answerId);
}

/*+
* payload should contain the
*
* */
export function updateAnswers(state, {answers}) {
  for (let i = 0; i < state.answers.length; i++) {
    for (let j = 0; j < answers.length; j++) {
      if (state.answers[i].id === answers[j].id) {
        state.answers[i] = answers[j];
      }
    }
  }
}

export function activateQuiz(state, activatedId) {
  const quiz = state.quizzes.find(quiz => quiz.id === activatedId);
  quiz.active = true;
}

export function deactivateQuiz(state, activatedId) {
  const quiz = state.quizzes.find(quiz => quiz.id === activatedId);
  quiz.active = false;
  quiz.stored = false;
}

export function reset(state) {
  Object.assign(state, initialState());
}
