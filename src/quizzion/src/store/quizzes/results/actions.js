import * as api from '../../../api/api'
//TODO

/*
*
*
* */
export function fetchResultsForQuiz({commit}, payload) {

  let quizId = payload.quizId;

  return new Promise(async(resolve, reject) =>{
    try{
      let response = await api.fetchResults(quizId)
      commit('setResults', Object.values(response.data))
      resolve();
    }catch (e) {
      console.log(e);
      reject(e);
    }
  });
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
