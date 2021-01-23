const fs = require('fs')

fs.readFile('puzzle', 'utf8', (err, contents) => {
  if (err) {
    console.log('ERR', err)
  }
  const entries = contents.split('\n').map(val => parseInt(val))
  const answer = []
  entries.forEach((entry) => {
    const corresponding = entries.find((val) => (val !== entry) && (val + entry) === 2020)
    if (corresponding && !answer.length) {
      answer.push(entry)
      answer.push(corresponding)
    }
  })
  console.log('Answer is', answer[0] * answer[1])
})
