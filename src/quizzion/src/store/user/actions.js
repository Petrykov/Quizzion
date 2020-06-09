import * as api from '../../api/api'
import ca from "quasar/lang/ca";


export function login({commit, dispatch}, credentials) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.login(credentials);
      //MOCK DATA
      console.log("Mocking store...");
      dispatch('mockStore', null, {root: true});

      commit('login', response.data);

      dispatch('quizzes/initialiseAll', null, {root: true}).then(() => {
        this.$router.push('/');
        resolve();
      }).catch((e) => {
        reject(e);
      });

    } catch (e) {
      console.log("Error while login API: ");
      console.log(e);
      reject(e);
    }
  });
}

export function logout({dispatch}) {

  return new Promise(async (resolve, reject) => {
    try {
      await api.logout(); //do we need a response?
      //reset all data in app, we don't need it anymore, call the root action 'resetAll'
      dispatch('resetAll', null, {root: true});
      resolve();
    } catch (e) {
      console.log("Error while logout API: ");
      console.log(e);
      reject(e);
    }
  });
}

export function participate({commit, dispatch}, displayName) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.participate(displayName);
      commit('participate', response.data);

      console.log("Mocking store...");
      dispatch('mockStore', null, {root: true});

      resolve();
    } catch (e) {
      console.log("Error while participate API: ");
      console.log(e);
      reject(e);
    }
  });
}

export function reset({commit}) {
  commit('reset');
}
