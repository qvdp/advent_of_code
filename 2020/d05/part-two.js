const fs = require('fs')
const constants = {
  ROW_MIN: 0,
  ROW_MAX: 127,
  COL_MIN: 0,
  COL_MAX: 7
}

fs.readFile('puzzle', 'utf8', (err, contents) => {

  if (err) {
    console.log('ERR', err)
  }

  // Build entries & parse it
  const entries = contents.split('\n')
  const seats = entries.reduce((acc, str) => {

    // We parse str in a detailed object to isolate rown details from row details
    if (str && str.length) {

      // Prepare object
      const details = { rowBin: '', row: 0, colBin: '', col: 0 }

      // Loop into the tring
      let i = 0
      while (str[i]) {

        const char = str[i]
        details[['F','B'].includes(char) ? 'rowBin' : 'colBin'] += char
        i++

      }
      acc.push(details)

    }
    return acc

  }, [])

  // Then start exercise logic
  let i = 0
  while (seats[i]) {

    // Get seats details
    const { rowBin = '', colBin = ''  } = seats[i]

    if (rowBin && colBin) {

      // Build row
      let { ROW_MAX } = constants
      let rowPos = 0, currenRowtOffset = ROW_MAX
      let row = rowBin.split('').reduce((pos, char) => {

        const isLower = !!(char === 'F')
        currenRowtOffset = Math[isLower ? 'floor' : 'ceil'](currenRowtOffset/2)
        if (!isLower) {
          pos += currenRowtOffset
        }
        return pos

      }, rowPos)

      // Build col
      let { COL_MAX } = constants
      let colPos = 0, currentColOffset = COL_MAX
      let col = colBin.split('').reduce((pos, char) => {

        const isLower = !!(char === 'L')
        currentColOffset = Math[isLower ? 'floor' : 'ceil'](currentColOffset/2)
        if (!isLower) {
          pos += currentColOffset
        }
        return pos

      }, colPos)

      // Finally assign computed seat row & col
      Object.assign(seats[i], { row, col, id: (row * 8 + col) })

    }
    i++

  }
  const { id } = seats.find(({ id: id1 }) => seats.find(({ id: id2 }) => id1 + 2 === id2) && !seats.find(({ id: id3 }) => id1 + 1 === id3))
  console.log(id + 1)
})
