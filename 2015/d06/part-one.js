const fs = require('fs')

fs.readFile('puzzle', 'utf8', (err, contents) => {

  if (err) {
    console.log('ERR', err)
  }

  // Build entries & parse it
  const entries = contents.split('\n')
  const groups = []
  let i = 0
  let currentGoup = ''
  while (i < entries.length) {

    // Build new group or append current group
    if (!entries[i]) {
      if (currentGoup) {
        const answers = currentGoup.split(' ')
        const yesAnswers = [...new Set(currentGoup.split(''))]
        const index = yesAnswers.findIndex(val => val === ' ')
        if (index >= 0) {
          yesAnswers.splice(index, 1)
        }
        groups.push({
          answers,
          yesAnswers,
          yesCount: yesAnswers.length
        })
      }
      currentGoup = ''
    } else {
      currentGoup = `${currentGoup} ${entries[i]}`.trim()
    }
    i++

  }
  console.log(groups)
  // We sum the number of yes answers per groups
  console.log('Asnwer is', groups.reduce((acc, { yesCount }) => {
    acc += yesCount
    return acc
  }, 0))

})
