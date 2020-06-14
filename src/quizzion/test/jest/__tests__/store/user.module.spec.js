import {createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import {login} from '../../../../src/api/api.js';
import {createStoreConfig} from '../../../../src/store';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('../../../../src/api/api.js');

describe('User module', () => {
  it('Login retrieves user information', async () => {
    const user = {
      username: 'WandaE',
      token: 'accesstoken',
      uh: 'ghu76t',
      firstname: 'Wanda',
      lastname: 'Evans',
      email: 'wanda.evans@vueteam.com',
    };
    const loginResponse = new Promise(resolve =>  resolve({status: 200, data: user}));

    login.mockResolvedValue(loginResponse);

    const store = new Vuex.Store(createStoreConfig());

    await store.dispatch('user/login', {username: 'username', password: 'password'});

    expect(store.state.user.name).toBe(user.firstname + ' ' + user.lastname);
    expect(store.state.user.displayName).toBe(user.username);
    expect(store.state.user.token).toBe(user.token);
    expect(store.state.user.email).toBe(user.email);
    expect(store.state.user.userId).toBe(user.uh);
  });
});
