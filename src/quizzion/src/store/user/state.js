export default function () {
  return {
    role: '', //maybe enum or sth for mod or respondent
    displayName: '', //display name, for mods that is registered in db
    token: 'f08b7faf0ccc9a171917c4f78a6998dcce91812cb3efa225d6e20a3ea806787d5c2cc3767109caa92c930a35e2869456609a5cf0c3fac71f605952c7cc57d979', //token to access Parantion backend

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
