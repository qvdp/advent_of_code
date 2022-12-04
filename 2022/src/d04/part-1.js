import getPairs from './common'

const overlapping = (min0, min1, max0, max1) => (min0 <= min1 && max0 >= max1) || (min0 >= min1 && max0 <= max1)

export default async (puzzle) => new Promise((resolve) => {
  // Get pairs
  const pairs = getPairs(puzzle)
  
  // Detect pairs that overlaps
  console.log(pairs)
  const overlappingCounter = pairs.reduce(
    (counter, { min0, min1, max0, max1 }) => {
      counter += +(overlapping(min0, min1, max0, max1))
      return counter
    },
    0
  )

  return resolve(overlappingCounter)
})