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

//TODO: There's probably more things we want to show as results
export function getTotalScore(state,getters){
  return function (resultId) {
    let totalScore = 0;

    getters.getResultById(resultId).responses.forEach( responseId => {
      if (getters.isResponseCorrect(responseId)) totalScore += 10;
    });

    return totalScore;
    return total
  }
}
