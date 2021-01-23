const fs = require('fs')
const crypto = require('crypto')

fs.readFile('puzzle', 'utf8', (err, contents) => {

  if (err) {

    console.log('ERR', err)

  }
  const [pass] = contents.split('\n')

  let i = 0
  let hash = crypto.createHash('md5').update(`${pass}${i}`).digest('hex')
  while (!hash.startsWith('00000')) {

    i++
    hash = crypto.createHash('md5').update(`${pass}${i}`).digest('hex')

  }
  console.log('Answer is ', i)

})
