import {createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import * as api from '../../../../src/api/api.js';
import {createStoreConfig} from '../../../../src/store';
import {initialiseAll} from '../../../../src/store/quizzes/actions';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('../../../../src/api/api.js');

describe('Quizzes module', () => {

  describe('In general, the', () => {

    it('initialiseAll action dispatches fetch quizzes/questions/answers', async () => {
      const dispatch = jest.fn();
      await initialiseAll({dispatch});
      expect(dispatch).toHaveBeenCalledWith('fetchQuizzes');
      expect(dispatch).toHaveBeenCalledWith('fetchQuestions');
      expect(dispatch).toHaveBeenCalledWith('fetchAnswers');
    });
  });

  describe('Regarding quizzes, the', () => {

    it('fetchQuizzes action retrieves and stores list of quizzes', async () => {

      const quizzes = [
        {title: 'title', id: 'id', color: 'color', questions: [], logo: 'logo'},
        {title: 'title', id: 'id', color: 'color', questions: [], logo: 'logo'},
        {title: 'title', id: 'id', color: 'color', questions: [], logo: 'logo'}
      ];
      const fetchQuizzesResponse = new Promise(resolve => resolve({status: 200, data: quizzes}));

      api.fetchQuizzes.mockResolvedValue(fetchQuizzesResponse);

      const store = new Vuex.Store(createStoreConfig());

      await store.dispatch('quizzes/fetchQuizzes');

      expect(store.state.quizzes.quizzes).toEqual(quizzes);
    });

    it('fetchInvitedQuiz action retrieves and stores all quiz content from single quiz', async () => {

      const quiz = {title: 'title', id: 'id', color: 'color', questions: [], logo: 'logo'};
      const questions = [
        {title: 'title', id: 'id', time: 10, answers: [], image: 'image'},
        {title: 'title', id: 'id', time: 10, answers: [], image: 'image'},
        {title: 'title', id: 'id', time: 10, answers: [], image: 'image'}];
      const answers = [
        {label: 'label', id: 'id', correct: false},
        {label: 'label', id: 'id', correct: false},
        {label: 'label', id: 'id', correct: false}];

      const fetchInvitedQuizResponse = new Promise(resolve => resolve({status: 200, data: {quiz, questions, answers}}));

      api.fetchInvitedQuiz.mockResolvedValue(fetchInvitedQuizResponse);

      const store = new Vuex.Store(createStoreConfig());

      await store.dispatch('quizzes/fetchInvitedQuiz', 'quizId');

      expect(store.state.quizzes.quizzes).toEqual([quiz]);
      expect(store.state.quizzes.questions).toEqual(questions);
      expect(store.state.quizzes.answers).toEqual(answers);
    });
  });

  describe('Regarding questions, the', () => {

    it('fetchQuestions action retrieves and stores list of questions', async () => {

      const questions = [
        {title: 'title', id: 'id', time: 10, answers: [], image: 'image'},
        {title: 'title', id: 'id', time: 10, answers: [], image: 'image'},
        {title: 'title', id: 'id', time: 10, answers: [], image: 'image'}
      ];
      const fetchQuestionsResponse = new Promise(resolve => resolve({status: 200, data: questions}));

      api.fetchQuestions.mockResolvedValue(fetchQuestionsResponse);

      const store = new Vuex.Store(createStoreConfig());

      await store.dispatch('quizzes/fetchQuestions');

      expect(store.state.quizzes.questions).toEqual(questions);
    });
  });

  describe('Regarding answers, the', () => {

    it('fetchAnswers action retrieves and stores list of answers', async () => {

      const answers = [
        {label: 'label', id: 'id', correct: false},
        {label: 'label', id: 'id', correct: false},
        {label: 'label', id: 'id', correct: false}
      ];
      const fetchAnswersResponse = new Promise(resolve => resolve({status: 200, data: answers}));

      api.fetchAnswers.mockResolvedValue(fetchAnswersResponse);

      const store = new Vuex.Store(createStoreConfig());

      await store.dispatch('quizzes/fetchAnswers');

      expect(store.state.quizzes.answers).toEqual(answers);
    });

    it('createAnswer action should store the answer and it\'s id', async () => {

      const newAnswer = {label: 'label', correct: false, questionId: 'test'};

      const createAnswerResponse = new Promise(resolve => resolve({status: 201, data: {...newAnswer, id: 'generatedByBackend'}}));

      api.createAnswer.mockResolvedValue(createAnswerResponse);

      const store = new Vuex.Store(createStoreConfig());
      store.commit('quizzes/setQuestions', [{id: 'test', answers: []}]);

      await store.dispatch('quizzes/createAnswer', {answer: newAnswer, questionId: 'test'});

      expect(store.state.quizzes.answers).toContainEqual({...newAnswer, id: 'generatedByBackend'});
      expect(store.state.quizzes.questions[0].answers).toContain('generatedByBackend');
    });

    it('updateAnswers action should replace all the updated answers', async () => {
      const answers = [
        {label: 'label', id: '1', correct: false},
        {label: 'label', id: '2', correct: false},
        {label: 'label', id: '3', correct: false}
      ];
      const updateAnswersResponse = new Promise(resolve => resolve());

      api.updateAnswers.mockResolvedValue(updateAnswersResponse);

      const store = new Vuex.Store(createStoreConfig());
      store.commit('quizzes/setAnswers', answers);

      const updatedAnswers = [
      {label: 'new', id: '1', correct: false},
      {label: 'label', id: '2', correct: true}];
      await store.dispatch('quizzes/updateAnswers', {answers: updatedAnswers});

      expect(store.state.quizzes.answers).toContainEqual(updatedAnswers[0]);
      expect(store.state.quizzes.answers).toContainEqual(updatedAnswers[1]);
      expect(store.state.quizzes.answers.length).toBe(3);
    });

    it('deleteAnswer action should delete the specified answer', async () => {
      const answers = [
        {label: 'label', id: '1', correct: false},
        {label: 'label', id: '2', correct: false},
        {label: 'label', id: '3', correct: false}
      ];

      const deleteAnswerResponse = new Promise(resolve => resolve({status: 200}));

      api.deleteAnswer.mockResolvedValue(deleteAnswerResponse);

      const store = new Vuex.Store(createStoreConfig());
      store.commit('quizzes/setQuestions', [{id: 'test', answers: ['1', '2']}]);
      store.commit('quizzes/setAnswers', answers);

      await store.dispatch('quizzes/deleteAnswer', {answerId: '1', questionId: 'test'});

      expect(store.state.quizzes.answers).not.toContainEqual({label: 'label', id: '1', correct: false});
      expect(store.state.quizzes.questions[0].answers).not.toContain('1');
      expect(store.state.quizzes.answers.length).toBe(2);
    });
  });
});
