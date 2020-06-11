export default function () {
  return {
    role: '', //maybe enum or sth for mod or respondent
    displayName: '', //display name, for mods that is registered in db
    token: '53594014f78ac9e071826890a41d36b88618ec2456fee7c5251ba6075cf3ff9707fc7244d1e20a656669b7e353ebf3ed7623787645be541f4f9b819b46b4d6df', //token to access Parantion backend

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
