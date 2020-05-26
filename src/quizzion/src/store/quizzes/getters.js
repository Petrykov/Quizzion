/*
* supply an id to retrieve the full objects out of a collection
*
* usage: $store.getters['quizzes/getQuizById'](id)
*
* */


export function getQuizById( state ) {
    return function (id) {
        return state.quizzes.find(quiz => quiz.id === id);
    }
}

export function getQuestionById( state ) {
    return function (id) {
        return state.questions.find(question => question.id === id);
    }
}

export function getAnswerById( state ) {
    return function (id) {
        return state.answers.find(answer => answer.id === id);
    }
}
