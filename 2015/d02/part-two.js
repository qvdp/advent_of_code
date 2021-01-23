const fs = require('fs')

// N.B. rect: 2*l*w + 2*w*h + 2*h*l.
// && input format: length l, width w, and height h
fs.readFile('puzzle', 'utf8', (err, contents) => {

  if (err) {

    console.log('ERR', err)

  }
  const entries = contents.split('\n')
  const gifts = []
  entries.forEach((entry) => {
    if (entry) {
      const [length, width, height] = entry.split('x')
      const lw = parseInt(length) * 2 + parseInt(width) * 2
      const wh = parseInt(width) * 2 + parseInt(height) * 2
      const hl = parseInt(height) * 2 + parseInt(length) * 2
      const min = Math.min(lw, wh, hl)
      const volume = parseInt(length) * parseInt(width) * parseInt(height)
      gifts.push({
        length: parseInt(length),
        width: parseInt(width),
        height: parseInt(height),
        min,
        volume,
        total: volume + min
      })
    }
  })
  console.log('Answer is ', gifts.reduce((acc, { total }) => acc + total, 0))
})
