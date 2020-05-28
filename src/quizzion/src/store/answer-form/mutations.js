import initialState from "./state";

/*
* payload should contain the ID of the quiz a user is responding to.
*
* */
export function startQuiz( state, quizId ) {
    state.quizId = quizId;
}

/*
* payload should contain the question ID as key and the selected answer in for of an enum.
*
* */
export function answerQuestion( state, answer ) {
    // state.answers.push(answer);
    state.answers = { ...state.answers, answer }
}

export function reset( state ) {
    Object.assign(state, initialState());
}

//mock only for dev
import { answerFormMock } from "./state";

export function mock(state) {
  state.quizId = answerFormMock.quizId;
  state.answers = answerFormMock.answers;
}
