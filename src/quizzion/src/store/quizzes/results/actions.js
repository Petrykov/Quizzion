import * as api from '../../../api/api'
//TODO

/*
*
*
* */
export function fetchResults({commit}) {
  api.fetchResults(
    //handle success
    (response) => commit('setResults', response.data),
    //handle failure
    () => {
    }
  )
}

export function getRespondentResults({commit}, payload) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.fetchRespondentResult(payload);

      commit('setResults', response.data);
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export function reset({commit}) {
  commit('reset');
}
