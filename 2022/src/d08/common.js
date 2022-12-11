const ROW_SEPERATOR = '\n'
const COLUMN_SEPERATOR = ''

export default (puzzle) => {
  
  // Build a list of rows & a list of columns
  const rows = puzzle.split(ROW_SEPERATOR)
  const rowLength = rows[0].length
  const columns = [
    ...Array(rowLength)
  ]
    .map(
      (char, columnIndex) => [...rows.map((row) => row.charAt(columnIndex))].join('')
    )
  const columnLength = rows.length

  // Prepare a map of trees
  const trees = []

  // Fill the map
  // Loop vertically
  let verticalCursor = 0
  while (rows[verticalCursor]) {

    if (verticalCursor > 0 && verticalCursor < columnLength - 1) {

      const row = rows[verticalCursor].split('')

      // Loop horizontally
      let horizontalCursor = 0
      while (row[horizontalCursor]) {

        if (horizontalCursor > 0 && horizontalCursor < rowLength - 1) {

          const column = columns[horizontalCursor].split('')
          trees.push({
            height: parseInt(row[horizontalCursor]),
            top: column.slice(0, verticalCursor).reverse(),
            left: row.slice(0, horizontalCursor).reverse(),
            right: row.slice(horizontalCursor + 1, rowLength),
            bottom: column.slice(verticalCursor + 1, columnLength)
          })

        }
        horizontalCursor += 1

      }

    }
    verticalCursor += 1

  }
  return trees

}
