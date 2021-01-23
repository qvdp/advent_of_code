const fs = require('fs')
const crypto = require('crypto')

fs.readFile('puzzle', 'utf8', (err, contents) => {

  if (err) {

    console.log('ERR', err)

  }
  const entries = contents.split('\n')
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const forbidden = ['ab', 'cd', 'pq', 'xy']
  const record = {
    hasVowlers: false,
    hasDouble: false,
    hasNoForbidden: false
  }
  const stringsVerifications = []
  entries.forEach((entry) => {

    if (entry) {

      const split = entry.split('')
      const stringVerifications = { entry, ...record }
      if (split.reduce((acc, char) => { return acc += vowels.includes(char) ? 1 : 0 }, 0) >= 3) {

        stringVerifications.hasVowlers = true

      }
      if (split.find(char => entry.includes(`${char}${char}`))) {

        stringVerifications.hasDouble = true

      }
      if (forbidden.every((el) => !entry.includes(el))) {

        stringVerifications.hasNoForbidden = true

      }
      stringsVerifications.push(stringVerifications)

    }

  })
  console.log('Answer is ', stringsVerifications.filter(({ hasVowlers, hasDouble, hasNoForbidden }) => hasVowlers && hasDouble && hasNoForbidden).length)

})
