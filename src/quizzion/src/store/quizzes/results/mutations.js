import initialState from './state'
//TODO

export function setResults(state, results) {
  state.results = results;
}

export function reset(state) {
  Object.assign(state, initialState());
}

//mock only for dev
import { resultsMock } from "./state";

export function mock(state) {
  state.results = resultsMock.results;
  state.guesses = resultsMock.guesses;
}

