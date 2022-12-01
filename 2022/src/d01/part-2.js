import getElves from './common'

export default async (puzzle) => new Promise((resolve) => {
  const elves = getElves(puzzle)

  const [first, second, third] = elves.map(({ sum }) => sum).sort((a, b) => b - a)

  return resolve(first + second + third)
})