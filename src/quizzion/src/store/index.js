import Vue from 'vue';
import Vuex from 'vuex';

import quizzes from './quizzes';
import user from './user';
import firebase from 'firebase';

Vue.use(Vuex);

const modules = {
  quizzes,
  user
};
//initialize firebase app
firebase.initializeApp({
  apiKey: 'AIzaSyBTxjMYfe3FcYQPE1fQsBoKwBkExKbkay0',
  authDomain: 'quizzion-parantion.firebaseapp.com',
  databaseURL: 'https://quizzion-parantion.firebaseio.com',
  projectId: 'quizzion-parantion',
  storageBucket: 'quizzion-parantion.appspot.com',
  messagingSenderId: '222824783332',
  appId: '1:222824783332:web:86aaf98f891c39de68fbf1',
  measurementId: 'G-0LJSYKN8BX'
});

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
      }
    },

    //enable strict mode (adds overhead!)
    //for dev mode only
    strict: process.env.DEV
  };
}

//----- WebStorm gives a warning ↓↓↓ about typing, I believe it's a Vuex thing (https://github.com/vuejs/vuex/issues/1689), the store works regardless
const store = new Vuex.Store(createStoreConfig());

export default store;
