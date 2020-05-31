import { Roles } from "../enums";
import initialState from './state'

export function login( state, user ) {
    state.role = Roles.MODERATOR;
    state.displayName = user.displayName;
    // state.token = user.token;
    state.quizzes = user.quizzes;
    state.name = user.name;
    state.email = user.email;
    state.language = user.language;
}

export function participate( state, user) {
    state.role = Roles.RESPONDENT;
    // state.token = user.token;
    state.displayName = user.displayName;
}

export function createQuiz( state, newQuizId ) {
    state.quizzes.push(newQuizId);
}

export function deleteQuizFromUser( state, deletedId ) {
  state.quizzes = state.quizzes.filter(quiz => quiz !== deletedId);
}

export function reset( state ) {
    Object.assign(state, initialState());
}

//mock only for dev
import { stateMockModerator } from "./state";

export function mock(state) {
  state.role = Roles.MODERATOR;
  state.displayName = stateMockModerator.displayName;
  // state.token = user.token;
  state.quizzes = stateMockModerator.quizzes;
  state.name = stateMockModerator.name;
  state.email = stateMockModerator.email;
  state.language = stateMockModerator.language;
}
