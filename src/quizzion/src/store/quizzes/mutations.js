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
export function updateQuiz( state, updatedQuiz ) {
    let index = state.quizzes.findIndex(quiz => quiz.id === updatedQuiz.id);
    state.quizzes[index] = updatedQuiz;
}

/*
* payload should contain only the id of the deleted quiz
*
* */
export function deleteQuiz( state, deletedId ) {
    state.quizzes.filter(quiz => quiz.id !== deletedId);
}

/* +
* payload should contain the newly created question in proper format, as well as the target quiz id
*
* */
export function createQuestion( state, {newQuestion, quizId}) {
    
    let quiz = state.quizzes.find(quiz => quiz.id === quizId);

    quiz.questions.push(newQuestion.id);
    state.questions.push(newQuestion);
}

/* +
* payload should contain the
*
* */
export function updateQuestion( state, {updatedQuestion, questionId, quizId} ) {

    console.log(updatedQuestion.answers);

    let quiz = state.quizzes.find(quiz => quiz.id === quizId);

    quiz.questions.map((question, index)=>{
        if(question === questionId){
            state.questions[index] = updatedQuestion;     
        }
    })
}

/* +
* payload should contain the full object that was edited, in proper format, as well as the id of the target quiz
* 
* */
export function deleteQuestion( state, {quizId, questionId} ) {
  
    let quiz = state.quizzes.find(quiz => quiz.id === quizId);
    
    quiz.questions.map((question, index) => {
        if(question === questionId){
            quiz.questions.splice(index,1);
            state.questions.splice(index,1);
        }
    });
}

/* +
* 
*/
export function addAnswer( state, {questionId, answer} ){

    let question = state.questions.find(question => question.id === questionId);

    state.answers.push(answer);

    question.answers.push(answer.id);
}

/* +
* 
*/
export function deleteAnswer( state, {questionId, answerId} ){

    let question = state.questions.find(question => question.id === questionId);

    state.answers.map((answer, index) => {
        if(answer.id === answerId){
            state.answers.splice(index,1);
        }
    });

    question.answers.map((answer, index) => {
        if(answer === answerId){
            question.answers.splice(index, 1);
        }
    });
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
