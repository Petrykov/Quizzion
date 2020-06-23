import * as api from '../../api/api.js'

/*
* Submit the collection of answers
*
* */
export function submitAnswerForm({ state, commit }) {
  console.log("Method empty");
    // api.submitAnswerForm(
    //     state.quizId,
    //     state.answers,
    //     //handle success
    //     () => commit('reset'),
    //     //handle failure
    //     () => {}
    // )
}

export function reset({ commit }) {
    commit('reset')
}
