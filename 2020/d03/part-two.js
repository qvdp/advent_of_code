const fs = require('fs')
const slopes = [
  { OFFSET_RIGHT: 1, OFFSET_DOWN: 1 },
  { OFFSET_RIGHT: 3, OFFSET_DOWN: 1 },
  { OFFSET_RIGHT: 5, OFFSET_DOWN: 1 },
  { OFFSET_RIGHT: 7, OFFSET_DOWN: 1 },
  { OFFSET_RIGHT: 1, OFFSET_DOWN: 2 }
]

fs.readFile('puzzle', 'utf8', (err, contents) => {
  if (err) {
    console.log('ERR', err)
  }
  // Build entries
  const entries = contents.split('\n')
  const answers = []
  // Verify each slope
  slopes.forEach(({ OFFSET_DOWN, OFFSET_RIGHT }) => {
    let pos = OFFSET_RIGHT
    let encounteredTrees = 0
    let i = 0
    while (entries[i]) {
      let val = entries[i]
      if (i > 0 && val) {
        // Ensure the string has correct length
        while (val.length <= pos) {
          val += val
        }
        // Verify if a tree is encountered
        if (val[pos] === '#') {
          encounteredTrees++
        }
        pos += OFFSET_RIGHT
      }
      i += OFFSET_DOWN
    }
    // 3424528800
    console.log(i, pos, encounteredTrees)
    answers.push(encounteredTrees)
  })
  console.log('Answer is', answers.reduce((acc, val) => acc * val, 1))
})
