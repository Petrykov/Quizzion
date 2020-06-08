import {Roles} from "../enums";
import initialState from './state'

export function login(state, user) {
  state.role = Roles.MODERATOR;
  state.displayName = user.username;
  state.token = user.uh;
  state.name = user.firstname + ' ' + user.lastname;
  state.email = user.email;
}

export function participate(state, user) {
  state.role = Roles.RESPONDENT;
  state.token = user.uh;
  state.displayName = user.displayName;
}

export function setQuizzes(state, quizzes) {
  quizzes.map((quiz) => {
    // should check with which value id returns from backend
    state.quizzes.push(quiz.id);
  });
}

export function createQuiz(state, newQuizId) {
  state.quizzes.push(newQuizId);
}

export function deleteQuizFromUser(state, deletedId) {
  state.quizzes = state.quizzes.filter(quiz => quiz !== deletedId);
}

export function reset(state) {
  Object.assign(state, initialState());
}

//mock only for dev
import {stateMockModerator} from "./state";

export function mock(state) {
  state.role = Roles.MODERATOR;
  state.displayName = stateMockModerator.displayName;
  state.token = stateMockModerator.token;
  state.quizzes = stateMockModerator.quizzes;
  state.name = stateMockModerator.name;
  state.email = stateMockModerator.email;
  state.language = stateMockModerator.language;
}
