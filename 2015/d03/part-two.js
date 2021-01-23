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
  const santa = { x: 0, y: 0 }
  const robo = { x: 0, y: 0 }
  while (directions[i]) {

    const direction = directions[i]
    const cursor = i % 2 ? robo : santa
    if (['>', '<'].includes(direction)) {

      cursor.x += direction === '>' ? 1 : -1

    } else if (['^', 'v'].includes(direction)) {

      cursor.y += direction === '^' ? 1 : -1

    }
    const correspondingIndex = map.findIndex(({ x: checkX, y: checkY }) => checkX === cursor.x && checkY === cursor.y)
    if (correspondingIndex >= 0) {

      map[correspondingIndex].total++

    } else {

      map.push({ x: cursor.x, y: cursor.y, total: 1 })

    }
    i++

  }
  console.log('Answer is ', map.length)

})
