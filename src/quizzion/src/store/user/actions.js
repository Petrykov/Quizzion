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
      await api.logout();
      //reset all data in app, we don't need it anymore, call the root action 'resetAll'
      await this.$router.push('/login');
      dispatch('resetAll', null, {root: true});
      resolve();
    } catch (e) {
      console.log("Error while logout API: ");
      console.log(e);
      reject(e);
    }
  });
}

export function join({commit, dispatch}, fh) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.join(fh);
      commit('join', response.data.token);

      resolve(response.data.token);
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
