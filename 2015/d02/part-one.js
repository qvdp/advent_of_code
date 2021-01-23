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
      const lw = parseInt(length) * parseInt(width)
      const wh = parseInt(width) * parseInt(height)
      const hl = parseInt(height) * parseInt(length)
      const min = Math.min(lw, wh, hl)
      const area = 2 * lw + 2 * wh + 2 * hl
      gifts.push({
        length: parseInt(length),
        width: parseInt(width),
        height: parseInt(height),
        lw,
        wh,
        hl,
        min,
        area,
        total: area + min
      })
    }
  })
  console.log('Answer is ', gifts.reduce((acc, { total }) => acc + total, 0))
})
