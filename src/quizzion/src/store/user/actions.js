import * as api from '../../api/api';


export function login({commit, dispatch}, credentials) {
  return new Promise(async(resolve, reject) => {
    try {
      const response = await api.login(credentials);

      commit('login', response.data);
      resolve();
    } catch (e) {
      console.log('Error while login API: ');
      console.log(e);
      reject(e);
    }
  });
}

export function logout({dispatch}) {
  return new Promise(async(resolve, reject) => {
    try {
      await api.logout();
      //reset all data in app, we don't need it anymore, call the root action 'resetAll'
      await this.$router.push('/login');
      dispatch('resetAll', null, {root: true});
      resolve();
    } catch (e) {
      console.log('Error while logout API: ');
      console.log(e);
      reject(e);
    }
  });
}


export function join({commit, dispatch}, payload) {
  return new Promise(async(resolve, reject) => {
    try {
      const response = await api.join(payload);

      commit('join', {token: response.data.id, name: payload.name});
      resolve();
    } catch (e) {
      console.log('Error while participate API: ');
      console.log(e);
      reject(e);
    }
  });
}

export function reset({commit}) {
  commit('reset');
}
