import getElves from './common'

export default async (puzzle) => new Promise((resolve) => {
  const elves = getElves(puzzle)

  return resolve(Math.max(...elves.map(({ sum }) => sum)))
})