import { Resolver, Dot, FoldOrder } from '../_types'

const buildDotsMap = (entries: Array<string>): Array<Dot> => {

  const arr: Array<Dot> = []
  entries.forEach((entry) => {

    if (entry.includes(',')) {

      const [i, j] = entry.split(',')
      arr.push({
        i: +i,
        j: +j
      })

    }

  })
  return arr

}

const buildorders = (entries: Array<string>): Array<FoldOrder> => {

  const arr: Array<FoldOrder> = []
  entries.forEach((entry) => {

    if (entry.includes('=')) {

      const [directionString, value] = entry.split('=')
      arr.push({
        direction: directionString.split('').pop() === 'y' ? 'vertical' : 'horizontal',
        value: +value
      })

    }

  })
  return arr

}

const foldVertically = (dots: Array<Dot>, at: number): void => {

  // Get dots besides the horizontal folding line
  // && remove them from orginal array
  const movingDots: Array<Dot> = []
  let k = 0
  while (dots[k]) {

    const { j } = dots[k]
    if (j > at) {

      const [movingDot] = dots.splice(k, 1)
      movingDots.push(movingDot)
      k = 0

    } else {

      k++

    }

  }

  // Move dots in original array when necessary
  movingDots.forEach(({ i, j }) => {

    const correspondingIndex = dots.findIndex(
      ({ i: checkI, j: checkJ }) => checkI === i && checkJ === (at - (j - at))
    )
    if (correspondingIndex < 0) {

      dots.push({ i, j: (at - (j - at)) })

    }

  })

}

const foldHorizontally = (dots: Array<Dot>, at: number): void => {

  // Get dots after the vertical folding line
  // && remove them from orginal array
  const movingDots: Array<Dot> = []
  let k = 0
  while (dots[k]) {

    const { i } = dots[k]
    if (i > at) {

      const [movingDot] = dots.splice(k, 1)
      movingDots.push(movingDot)
      k = 0

    } else {

      k++

    }

  }

  // Move dots in original array when necessary
  movingDots.forEach(({ i, j }) => {

    const correspondingIndex = dots.findIndex(
      ({ i: checkI, j: checkJ }) => checkI === (at - (i - at)) && checkJ === j
    )
    if (correspondingIndex < 0) {

      dots.push({ i: (at - (i - at)), j })

    }

  })

}

const print = (map: Array<Dot>): void => {
  const maxX = Math.max(...map.map(({ i }) => i))
  const maxY = Math.max(...map.map(({ j }) => j))
  console.log(maxX, maxY)
  let k = 0
  while (k <= maxY) {

    let l = 0
    let str = ''
    while (l <= maxX) {

      str += map.find(({ i, j }) => i === l && j === k) ? '#' : '.'
      l++

    }
    console.log(str)
    k++

  }
}

// GOAL: determine how many paths there are
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build map from entieres
  const entries = puzzle.split('\n')
  const map: Array<Dot> = buildDotsMap(entries)
  const orders: Array<FoldOrder> = buildorders(entries)

  orders.forEach(({ direction, value }) => {

    direction === 'vertical' ? foldVertically(map, value) : foldHorizontally(map, value)
    if (value < 100) {
      print(map)
    }

  })

  // Return flash counter
  return resolve(`${map.length}`)

})

export default resolver
