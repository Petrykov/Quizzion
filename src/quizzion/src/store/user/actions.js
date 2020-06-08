import * as api from '../../api/api'
import ca from "quasar/lang/ca";


export function login({commit, dispatch}, credentials) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.login(credentials);
      //MOCK DATA
      console.log("Mocking store...");
      dispatch('mockStore', null, {root: true});

      commit('login', response.data[0]);

      dispatch('quizzes/initialiseAll', null, {root: true}).then(() => {
        this.$router.push('/');
        resolve();
      }).catch((e) => {
        reject(e);
      });

    } catch (e) {
      console.log("Error while login API: " + e);
      reject(e);
    }
  });
}

export function logout({dispatch}) {
  //reset all data in app, we don't need it anymore, call the root action 'resetAll'
  dispatch('resetAll', null, {root: true});
}

export function participate({commit, dispatch}, displayName) {
  api.participate(
    displayName,
    //handle success
    (response) => commit('participate', response.data),
    //handle failure
    () => {
    }
  );

  console.log("Mocking store...");
  dispatch('mockStore', null, {root: true});
}

export function reset({commit}) {
  commit('reset');
}
