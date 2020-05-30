import * as api from '../../../api/api'
//TODO

/*
*
*
* */
export function fetchResults({ commit }) {
    api.fetchResults(
        //handle success
        ( response ) => commit('setResults', response.data),
        //handle failure
        () => {}
    )
}

export function reset({ commit }) {
    commit('reset');
}
