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

export function getGuessById( state ) {
  return function ( id ) {
    return state.guesses.find(guess => guess.id === id);
  }
}

export function isGuessCorrect( state, getters, rootState, rootGetters ) {
  return function ( guessId ) {
    let guess = getters.getGuessById(guessId);
    return rootGetters['quizzes/getAnswerById'](guess.answerId).correct;
  }
}

//TODO: There's probably more things we want to show as results
export function getTotalScore(state,getters){
  return function (resultId) {
    let totalScore = 0;

    getters.getResultById(resultId).guessesIds.forEach( guessId => {
      if (getters.isGuessCorrect(guessId)) totalScore += 10;
    });

    return totalScore;
    return total
  }
}
