export function getTotalScore(state) {
  let total = 0;

  for (let result of state.results) {
    total += result.score;
  }

  return total;
}
