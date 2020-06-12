export default function () {
  return {
    role: '', //maybe enum or sth for mod or respondent
    displayName: '', //display name, for mods that is registered in db
    token: 'b135951e72899728cccaeb82bae350327a84e1aa19926825b00812b1a2146d8e1fbaf9f950e5f53d61260dcb8ed2d42246af915986a844da175e9fda38c19bb9', //token to access Parantion backend

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
