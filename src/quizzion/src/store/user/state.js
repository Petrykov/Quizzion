export default function () {
  return {
    role: '', //maybe enum or sth for mod or respondent
    displayName: '', //display name, for mods that is registered in db
    token: '', //token to access Parantion backend

    //rest solely for role === mod
    userId: '', //unique user id (database pk)
    quizzes: [], //array of quiz ID's
    name: '',
    email: '',
    language: ''
  }
}
