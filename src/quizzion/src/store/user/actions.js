import * as api from '../../api/api'

export function login ({ commit, dispatch }, credentials) {
    api.login(
        credentials,
        //handle success
        ( response ) => commit('login', response.data), //we might want to set the default axios headers here.
        //handle failure
        (/* error */) => {}
    );

    //MOCK DATA
    console.log("Mocking store...");
    dispatch('mockStore', null, {root: true})
}

export function logout({ dispatch }) {
    //reset all data in app, we don't need it anymore, call the root action 'resetAll'
    dispatch('resetAll', null, { root: true });
}

export function participate({ commit }, displayName) {
    api.participate(
        displayName,
        //handle success
        ( response ) => commit('participate', response.data),
        //handle failure
        () => {}
    )
}

export function reset({ commit }) {
    commit('reset');
}
