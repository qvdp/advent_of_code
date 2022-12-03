const ROUND_SEPERATOR = '\n'

const ROCK = 'rock'
const PAPER = 'paper'
const SCISSORS = 'scissors'
const WIN = 'win'
const DRAW = 'draw'
const LOSE = 'lose'

const CHOICE_MAPPER = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
}

const GOALS_MAPPER = {
  X: LOSE,
  Y: DRAW,
  Z: WIN
}

const SCORE_MAPPER = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3
}

const LOSE_MAPPER = {
  [ROCK]: SCISSORS,
  [PAPER]: ROCK,
  [SCISSORS]: PAPER
}

const WIN_MAPPER = {
  [SCISSORS]: ROCK,
  [ROCK]: PAPER,
  [PAPER]: SCISSORS
}

const getRounds = (puzzle) => puzzle
  .split(ROUND_SEPERATOR)
  .map((results) => {
    // Get player choices
    const [opponent, player] = results.split(' ')

    // Determine which sign play has to choose
    const goal = GOALS_MAPPER[player]
    let playerChoice
    if (goal === DRAW) {
      playerChoice = CHOICE_MAPPER[opponent]
    } else if (goal === WIN) {
      playerChoice = WIN_MAPPER[CHOICE_MAPPER[opponent]]
    } else {
      playerChoice = LOSE_MAPPER[CHOICE_MAPPER[opponent]]
    }

    // Calculte score
    // The score of a single round is sum of :
    // - player selected schape (1 for Rock, 2 for Paper, and 3 for Scissors)
    // - outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)
    let score = SCORE_MAPPER[playerChoice]
    if (goal === DRAW) {
      score += 3
    }
    if (goal === WIN) {
      score += 6
    }

    return {
      opponent: CHOICE_MAPPER[opponent],
      player: playerChoice,
      score
    }
  })

export default async (puzzle) => new Promise((resolve) => {
  const rounds = getRounds(puzzle)

  return resolve(rounds.map(({ score }) => score).reduce((a, b) => a + b, 0))
})