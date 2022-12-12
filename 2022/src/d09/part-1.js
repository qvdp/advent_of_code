import getMoves from './common'

const HORIZONTAL_MOVES = ['L', 'R']
const LEFT_MOVE = 'L'
const RIGHT_MOVE = 'R'
const VERTICAL_MOVES = ['U', 'D']
const UP_MOVE = 'U'
const DOWN_MOVE = 'D'

const alignTail = (direction, head, tail) => {
  if (HORIZONTAL_MOVES.includes(direction)) {
    tail.y = head.y
  }
  if (VERTICAL_MOVES.includes(direction)) {
    tail.x = head.x
  }
  updateCursor(tail, direction)
}

const updateCursor = (cursor, direction) => {
  if (direction === UP_MOVE) {
    cursor.y += 1
  }
  if (direction === DOWN_MOVE) {
    cursor.y -= 1
  }
  if (direction === LEFT_MOVE) {
    cursor.x -= 1
  }
  if (direction === RIGHT_MOVE) {
    cursor.x += 1
  }
  cursor.history.push(`${cursor.x}:${cursor.y}`)
}

const headPullsTail = (head, tail) => {
  if (Math.abs(head.x - tail.x) > 1) {
    return true
  }
  if (Math.abs(head.y - tail.y) > 1) {
    return true
  }
  return false
}

export default async (puzzle) => new Promise((resolve) => {

  // Get directory tree
  const moves = getMoves(puzzle)
  
  // Prepare head cursor
  const head = {
    x: 0,
    y: 0,
    history: ['0:0']
  }
  const tail = {
    x: 0,
    y: 0,
    history: ['0:0']
  }

  moves.forEach(({ direction, move }) => {
    while (move) {

      // Update head cursor
      updateCursor(head, direction)

      // Then update tail cursor only if necessary
      if (headPullsTail(head, tail)) {

        alignTail(direction, head, tail)

      }
      move--

    }
  })
  return resolve([...new Set([...tail.history])].length)

})
