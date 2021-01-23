const fs = require('fs')

fs.readFile('puzzle', 'utf8', (err, contents) => {

  if (err) {

    console.log('ERR', err)

  }
  const [entries,] = contents.split('\n')
  const chars = entries.split('')
  let i = 0
  let floor = 0
  while (chars[i] && floor >= 0) {

    const char = chars[i]
    if (char === '(') {

      floor++

    } else {

      floor--

    }
    i++

  }
  console.log('Answer is', i)

})
