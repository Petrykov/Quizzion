import {createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import {login, join} from '../../../../src/api/api.js';
import {createStoreConfig} from '../../../../src/store';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('../../../../src/api/api.js');

describe('User module', () => {
  describe('As a moderator, the', () => {
    it('login action retrieves and stores user information', async() => {
      const user = {
        username: 'WandaE',
        token: 'accesstoken',
        uh: 'ghu76t',
        firstname: 'Wanda',
        lastname: 'Evans',
        email: 'wanda.evans@vueteam.com'
      };
      const loginResponse = new Promise(resolve => resolve({status: 200, data: user}));

      login.mockResolvedValue(loginResponse);

      const store = new Vuex.Store(createStoreConfig());

      await store.dispatch('user/login', {username: 'username', password: 'password'});

      expect(store.state.user.name).toBe(user.firstname + ' ' + user.lastname);
      expect(store.state.user.displayName).toBe(user.username);
      expect(store.state.user.token).toBe(user.token);
      expect(store.state.user.email).toBe(user.email);
      expect(store.state.user.userId).toBe(user.uh);
      expect(store.state.user.role).toBe('moderator');
    });

    it('setQuizzes mutation sets list of quizIds', () => {
      const store = new Vuex.Store(createStoreConfig());

      const quizzes = [
        {id: 'quiz1', title: 'test'},
        {id: 'quiz2', title: 'test'},
        {id: 'quiz3', title: 'test'}
      ];

      store.commit('user/setQuizzes', quizzes);

      expect(store.state.user.quizzes).toEqual(['quiz1', 'quiz2', 'quiz3']);
    });

    it('createQuiz mutation adds quiz to quizzes list', () => {
      const store = new Vuex.Store(createStoreConfig());

      const quizzes = ['quiz1', 'quiz2', 'quiz3'];
      store.commit('user/setQuizzes', quizzes);

      const newId = 'quiz4';
      store.commit('user/createQuiz', newId);

      expect(store.state.user.quizzes).toContain(newId);
    });

    it('deleteQuizFromUser mutation adds quiz to quizzes list', () => {
      const store = new Vuex.Store(createStoreConfig());

      const quizzes = ['quiz1', 'quiz2', 'quiz3'];
      store.commit('user/setQuizzes', quizzes);

      const deletedId = 'quiz2';
      store.commit('user/deleteQuizFromUser', deletedId);

      expect(store.state.user.quizzes).not.toContain(deletedId);
    });
  });

  describe('As a respondent, the', () => {
    it('join action should retrieve and store a token', async() => {
      const respondentToken = 'uuidv4token';
      const joinResponse = new Promise(resolve => resolve({status: 200, data: {id: respondentToken}}));

      join.mockResolvedValue(joinResponse);

      const store = new Vuex.Store(createStoreConfig());

      await store.dispatch('user/join', {quizId: 'quiz10', name: 'JohnTest'});

      expect(store.state.user.token).toBe(respondentToken);
      expect(store.state.user.role).toBe('respondent');
    });
  });
});
