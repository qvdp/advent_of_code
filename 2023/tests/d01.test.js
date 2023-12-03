import main from '../src/index.js'

describe('[d01] - solutions', () => {
  const _day = 'd01'
  test('[d01/part_1]', async () => {
    const SOLUTION = 53921
    const answer = await main(_day, 'part-1')
    if (answer !== SOLUTION) {
      throw new error('E_WRONG_ANSWER')
    }
  });

  test('[d01/part_2]', async () => {
    const SOLUTION = 54676
    const answer = await main(_day, 'part-2')
    if (answer !== SOLUTION) {
      throw new error('E_WRONG_ANSWER')
    }
  });
})

