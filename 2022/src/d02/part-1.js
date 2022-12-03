const ROUND_SEPERATOR = '\n'

const ROCK = 'rock'
const PAPER = 'paper'
const SCISSORS = 'scissors'

const CHOICE_MAPPER = {
  A: ROCK,
  X: ROCK,
  B: PAPER,
  Y: PAPER,
  C: SCISSORS,
  Z: SCISSORS
}

const SCORE_MAPPER = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3
}

const WIN_MAPPER = {
  [ROCK]: SCISSORS,
  [PAPER]: ROCK,
  [SCISSORS]: PAPER
}

const getRounds = (puzzle) => puzzle
  .split(ROUND_SEPERATOR)
  .map((results) => {
    // Get player choices
    const [opponent, player] = results.split(' ')

    // Calculte score
    // The score of a single round is sum of :
    // - player selected schape (1 for Rock, 2 for Paper, and 3 for Scissors)
    // - outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)
    let score = SCORE_MAPPER[CHOICE_MAPPER[player]]
    if (CHOICE_MAPPER[opponent] === CHOICE_MAPPER[player]) {
      score += 3
    }
    if (CHOICE_MAPPER[opponent] === WIN_MAPPER[CHOICE_MAPPER[player]]) {
      score += 6
    }

    return {
      opponent: CHOICE_MAPPER[opponent],
      player: CHOICE_MAPPER[player],
      score
    }
  })

export default async (puzzle) => new Promise((resolve) => {
  const rounds = getRounds(puzzle)

  return resolve(rounds.map(({ score }) => score).reduce((a, b) => a + b, 0))
})