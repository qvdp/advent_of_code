const fs = require('fs')

fs.readFile('puzzle', 'utf8', (err, contents) => {
  if (err) {
    console.log('ERR', err)
  }
  const entries = contents.split('\n').map(val => parseInt(val))
  const answer = []
  entries.forEach((entry1) => {
    entries.forEach((entry2) => {
      const corresponding = entries.find((val) => (val !== entry1) && (val !== entry2) && (val + entry1 + entry2 === 2020))
      if (corresponding && !answer.length) {
        answer.push(entry1)
        answer.push(entry2)
        answer.push(corresponding)
      }
    })
  })
  console.log('Answer is', answer[0] * answer[1] * answer[2])
})
