const fs = require('fs')

fs.readFile('puzzle', 'utf8', (err, contents) => {
  if (err) {
    console.log('ERR', err)
  }
  // Build entries
  const entries = []
  contents.split('\n').reduce((acc = [], val) => {
    const [policy, letter = '', password] = val.split(' ')
    if(policy && letter && password) {
      const [one, two] = policy.split('-')
      acc.push({
        indexOne: password[parseInt(one) - 1],
        indexTwo: password[parseInt(two) - 1],
        letter: letter.substring(0, letter.length - 1),
        password
      })
    }
    return acc
  }, entries)

  // Verify each passwords
  const validPasswords = []
  entries.reduce((acc, { indexOne, indexTwo, letter, password }) => {
    if (indexOne !== indexTwo && (indexOne === letter || indexTwo === letter)) {
      acc.push(password)
    }
    return acc
  },validPasswords)
  console.log('Answer is', validPasswords.length)
})
