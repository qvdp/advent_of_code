// GOAL: determine how much time the depth is increasing
const ELF_SEPARATOR = '\n\n'
const CAL_SEPARATOR = '\n'

export default async (puzzle) => new Promise((resolve) => {
  const elves = []

  puzzle
    .split(ELF_SEPARATOR)
    .forEach((caloriesStr) => {
      const calories = caloriesStr.split(CAL_SEPARATOR).map((cal) => parseInt(cal, 10))
      const sum = calories.reduce((a, b) => a + b, 0)
      elves.push({ calories, sum })
    })

  const [first, second, third] = elves.map(({ sum }) => sum).sort((a, b) => b - a)

  return resolve(first + second + third)
})