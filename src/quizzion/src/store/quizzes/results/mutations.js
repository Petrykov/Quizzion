import initialState from './state'
//TODO

export function setResults(state, results) {
  state.results = results;
}

export function reset(state) {
  Object.assign(state, initialState());
}
