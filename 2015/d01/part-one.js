const fs = require('fs')

fs.readFile('puzzle', 'utf8', (err, contents) => {

  if (err) {

    console.log('ERR', err)

  }
  const [entries,] = contents.split('\n')
  const chars = entries.split('')
  const ups = chars.filter(c => c === '(')
  const downs = chars.filter(c => c === ')')
  console.log('Answer is', ups.length - downs.length)

})
