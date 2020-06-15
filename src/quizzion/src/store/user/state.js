export default function () {
  return {
    role: '', //maybe enum or sth for mod or respondent
    displayName: '', //display name, for mods that is registered in db
    token: 'a31c35910ef9017ea86526d389c59dfb4b172277ef75b50c035b7deef03156777b85937e39e96080a3a1d98d2bad613ae6be12f5b21685f7592dff305e3ce489', //token to access Parantion backend

    //rest solely for role === mod
    userId: '', //unique user id (database pk)
    quizzes: [], //array of quiz ID's
    name: '',
    email: '',
    language: ''
  }
}

/*
*
* Example of what a user will look like
* Reason quizzes is an array of IDs here: https://forum.vuejs.org/t/vuex-best-practices-for-complex-objects/10143/2
*
* */
import {Roles} from '../enums'

//respondent
export let stateMockRespondent = {
  role: Roles.RESPONDENT,
  displayName: 'JohnD',
  token: 'hisaccesstoken'
};

//moderator
export let stateMockModerator = {
  role: Roles.MODERATOR,
  displayName: 'WandaE',
  token: 'heraccesstoken',

  userId: 'ghu76t', //unique user id (database pk)
  quizzes: [], //array of quiz ID's
  name: 'Wanda Evans',
  email: 'wanda.evans@vueteam.com',
  language: 'English'
};
