import Vue from 'vue'
import Vuex from 'vuex'

import answerForm from './answer-form'
import quizzes from './quizzes'
import user from './user'

Vue.use(Vuex);

const modules = {
  answerForm,
  quizzes,
  user
};

export function createStoreConfig() {
  return {
    modules,
    actions: {
      resetAll({dispatch}) {
        for (const moduleName of Object.keys(modules)) {
          if (modules[moduleName].actions && modules[moduleName].actions.reset) {
            dispatch(`${moduleName}/reset`);
          }
        }
      },
      //this will be removed after we connected the backend etc. (Don't forget to remove the 'mock' mutations in each module also.
      mockStore({commit}) {
        for (const moduleName of Object.keys(modules)) {
          if (modules[moduleName].mutations && modules[moduleName].mutations.mock) {
            commit(`${moduleName}/mock`);
            if (moduleName === 'quizzes') commit('quizzes/results/mock')
          }
        }
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  }
};

//   ----- WebStorm gives a warning ↓↓↓ about typing, I believe it's a Vuex thing (https://github.com/vuejs/vuex/issues/1689), the store works regardless
const store = new Vuex.Store(createStoreConfig());

export default store;
