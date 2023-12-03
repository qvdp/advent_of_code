// GOAL: determine in each game you played, what is the
// fewest number of cubes of each color that could have
// been in the bag to make the game possible?
// Calculate the power of the minimum cubes

const COLORS = ['red', 'green', 'blue']

export default async (puzzle) => new Promise((resolve) => {
  // Parse games
  const games = puzzle.split('\n').map((line) => {
    const [gameString, setsString] = line.split(':')

    // Parse game number
    // (ie: `Game 4:`)
    const game = parseInt(gameString.trim().replace('Game ', ''))

    // Parse sets
    // (ie `1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red`)
    const sets = setsString
      .split(';')
      .map((str) => str
        .trim()
        .split(', ')
        .reduce((acc, curr) => {
          const [draw, color] = curr.split(' ')
          return Object.assign(acc, { [color]: parseInt(draw)})
        }, {})
      )

    return { game, sets }
  })


  // Calculate for each game the minimum required cubes & calculate the power
  return resolve(
    games
      .map(
        ({ sets }) => COLORS.reduce((acc, color) => {
          return Object.assign(acc, { [color]: Math.max(...sets.map((set) => set[color]).filter((val) => val >= 0)) })
        }, {})
      )
      .reduce((sum, { red, green, blue }) => sum += (red * green * blue), 0)
  )
})