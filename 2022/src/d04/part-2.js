import getPairs from './common'

const createRangeArr = (from, to) => {
  // Prepare string
  const arr = []
  while (from <= to) {
    arr.push(from)
    from++
  }
  return arr
}

const rangeOverlapping = (min0, min1, max0, max1) => {
  const range0 = createRangeArr(min0, max0)
  const range1 = createRangeArr(min1, max1)
  if (range0.some((int) => range1.includes(int))) {
    return true
  }
  return false
}

export default async (puzzle) => new Promise((resolve) => {
  // Get pairs
  const pairs = getPairs(puzzle)
  
  // Detect pairs that overlaps
  const rangeOverlappingCounter = pairs.reduce(
    (counter, { min0, min1, max0, max1 }) => {
      counter += +(rangeOverlapping(min0, min1, max0, max1))
      return counter
    },
    0
  )

  return resolve(rangeOverlappingCounter)
})