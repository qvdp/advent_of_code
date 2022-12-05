const STACKS_MOVES_SEPRATOR = '\n\n'
const LINE_SEPERATOR = '\n'

const sliceIntoChunks = (string, size) => {

  const chunks = []
  for (let i = 0; i < string.length; i += size) {

    chunks.push(string.slice(i, i + size).trim())

  }
  return chunks

}

const getStacks = (puzzle) => {

  // Get grouped stacks
  const [groupedStacks] = puzzle.split(STACKS_MOVES_SEPRATOR)

  // Get stack numbers
  const groupedStacksLines = groupedStacks.split(LINE_SEPERATOR)
  
  // Loop throught each line
  const stacks = []
  let i = 0
  while (i < (groupedStacksLines.length - 1)) {

    // Reduce this level of stacks into chunks of length 4 (crates)
    const currentStacksLevelCrates = sliceIntoChunks(groupedStacksLines[i], 4)

    // Create a list of stacks
    currentStacksLevelCrates.forEach((crate, index) => {
      if (!stacks[index]) {
        stacks[index] = []
      }
      if (crate) {
        stacks[index].push(crate[1])
      }
    })
    i += 1

  }
  return stacks

}

const getMoves = (puzzle) => {

  // Get grouped stacks
  const [, groupedMoves] = puzzle.split(STACKS_MOVES_SEPRATOR)

  // Get stack numbers
  const groupedMovesLines = groupedMoves.split(LINE_SEPERATOR)

  // Loop throught each line
  return groupedMovesLines.map((moveLive) => {

    const [move, from, to] = moveLive
      .replace('move ', '')
      .replace(' from ', '|')
      .replace(' to ', '|')
      .split('|')

    return { move, from, to }

  })

}

export {
  getStacks,
  getMoves
}
