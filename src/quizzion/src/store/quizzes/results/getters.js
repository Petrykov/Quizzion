export function getResultById( state ) {
    return function ( id ) {
        return state.results.find(result => result.id === id);
    }
}

export function getResultsOfQuiz( state ) {
    return function ( quizId ) {
        return state.results.filter(result => result.quizId === quizId);
    }
}

export function getTotalParticipantsOfQuiz( state ) {
    return function ( quizId ) {
      return state.results.filter(result => result.quizId === quizId).length;
    }
}


export function isResponseCorrect( state, getters, rootState, rootGetters ) {
  return function ( responseId ) {
    return rootGetters['quizzes/getAnswerById'](responseId).correct;
  }
}

export function getTotalScore(state){
  let total = 0;

  for (let result of state.results){
    total += result.score;
  }

  return total;
}
