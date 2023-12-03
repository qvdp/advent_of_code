// GOAL: determine which games could have been played
// if the original bag contained 12 red cubes, 13 green cubes, and 14 blue cubes
// It can be deduced by verifying each sets of each game
// suits (do not exceed) the number of provided cubes by color

const COLORS_MAX = ['red:12', 'green:13', 'blue:14']

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


  // Verify games that suits given case
  return resolve(
    games
      .filter(
        ({ sets }) => COLORS_MAX.every((colorMax) => {
          const [color, max] = colorMax.split(':')

          return Math.max(...sets.map((set) => set[color]).filter((val) => val >= 0)) <= parseInt(max)
        })
      )
      .reduce((sum, { game }) => sum += game, 0)
  )
})