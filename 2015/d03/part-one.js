const fs = require('fs')

// N.B. north (^), south (v), east (>), or west (<)
fs.readFile('puzzle', 'utf8', (err, contents) => {

  if (err) {

    console.log('ERR', err)

  }
  const [entries] = contents.split('\n')
  const directions = entries.split('')
  const map = [{ x: 0, y: 0, total: 1 }]
  let i = 0
  let x = 0
  let y = 0
  while (directions[i]) {

    const direction = directions[i]
    if (['>', '<'].includes(direction)) {

      x += direction === '>' ? 1 : -1

    } else if (['^', 'v'].includes(direction)) {

      y += direction === '^' ? 1 : -1

    }
    const correspondingIndex = map.findIndex(({ x: checkX, y: checkY }) => checkX === x && checkY === y)
    if (correspondingIndex >= 0) {

      map[correspondingIndex].total++

    } else {

      map.push({ x, y, total: 1 })

    }
    i++

  }
  console.log('Answer is ', map.length)

})
