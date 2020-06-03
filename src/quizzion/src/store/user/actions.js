import * as api from '../../api/api'

export function login ({ commit, dispatch }, credentials) {
    api.login(
        credentials,
        //handle success
        ( response ) => {
          commit('login', response.data[0]);
          // this.$router.push('/')
        }, //we might want to set the default axios headers here.
        //handle failure
        ( error ) => { console.log(error) }
    );

    //MOCK DATA
    console.log("Mocking store...");
    dispatch('mockStore', null, {root: true});
    // this.$router.push('/') //redirect to home after successful login (or, mock, in this case)
}

export function logout({ dispatch }) {
    //reset all data in app, we don't need it anymore, call the root action 'resetAll'
    dispatch('resetAll', null, { root: true });
}

export function participate({ commit, dispatch }, displayName) {
    api.participate(
        displayName,
        //handle success
        ( response ) => commit('participate', response.data),
        //handle failure
        () => {}
    );

  console.log("Mocking store...");
  dispatch('mockStore', null, {root: true});
}

export function reset({ commit }) {
    commit('reset');
}
