import initialState from "./state";

/*
* payload should contain an array of quizzes
*
* */
export function setQuizzes( state, quizzes ) {
    state.quizzes = quizzes;
}

/*
* payload should contain an array of questions
*
* */
export function setQuestions( state, questions ) {
    state.questions = questions;
}

/*
* payload should contain an array of answers
*
* */
export function setAnswers( state, answers ) {
    state.answers = answers;
}

/*
* payload should contain the newly created quiz in proper format
*
* */
export function createQuiz( state, newQuiz ) {
    state.quizzes.push(newQuiz);
}

/*
* payload should contain the full object that was edited, in proper format
*
* */
export function updateQuiz( state, {id,updatedQuiz} ) {
    let index = state.quizzes.findIndex(quiz => quiz.id === id);
    state.quizzes[index] = updatedQuiz;
}

/*
* payload should contain only the id of the deleted quiz
*
* */
export function deleteQuiz( state, deletedId ) {
    // console.log("delete quiz works")
    // state.quizzes.filter(quiz => quiz.id !== deletedId);
    // let quiz = state.quizzes.find(quiz => quiz.id === quizId);
    state.quizzes.map((quiz, index) => {
        if(quiz.id === deletedId){
            state.quizzes.splice(index,1);
        }
    });

}

/*
* payload should contain the newly created question in proper format, as well as the target quiz id
*
* */
export function createQuestion( state, payload ) {
    //add the id of the question to the target quiz
    let quiz = state.quizzes.find(quiz => quiz.id === payload.quizId);
    quiz.questions.push(payload.newQuestion.id);
    //add the whole question to the questions array
    state.questions.push(payload.newQuestion);
}

/*
* payload should contain the
*
* */
export function updateQuestion( state, payload ) {
    let index = state.questions.findIndex(question => question.id === payload.updatedQuestion.id);
    quiz.questions[index] = payload.updatedQuestion;
}

/*
* payload should contain the full object that was edited, in proper format, as well as the id of the target quiz
*
* */
export function deleteQuestion( state, payload ) {
    let quiz = state.quizzes.find(quiz => quiz.id === payload.quizId);
    quiz.questions.filter(question => question.id !== payload.deletedQuestionId);
}

export function reset( state ) {
    Object.assign(state, initialState());
}

//mock only for dev
import { quizzesMock } from "./state";

export function mock(state) {
  state.quizzes = quizzesMock.quizzes;
  state.questions = quizzesMock.questions;
  state.answers = quizzesMock.answers;
}
