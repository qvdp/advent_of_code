const fs = require('fs')
const OFFSET_RIGHT = 3
const OFFSET_DOWN = 1

fs.readFile('puzzle', 'utf8', (err, contents) => {
  if (err) {
    console.log('ERR', err)
  }
  // Build entries
  const entries = contents.split('\n')

  // Verify each slope
  let pos = OFFSET_RIGHT
  let encounteredTrees = 0
  let i = 0
  while (entries[i]) {
    let val = entries[i]
    if (i > 0 && val) {
      // Ensure the string has correct length
      while (val.length < pos) {
        val = `${val}${val}`
      }
      // Verify if a tree is encountered
      if (val[pos] === '#') {
        encounteredTrees++
      }
      pos += OFFSET_RIGHT
    }
    i += OFFSET_DOWN
  }
  console.log('Answer is', encounteredTrees)
})
