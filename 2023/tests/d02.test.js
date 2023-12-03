import main from '../src/index.js'

describe('[d02] - solutions', () => {
  const _day = 'd02'
  test('[d02/part_1]', async () => {
    const SOLUTION = 2085
    const answer = await main(_day, 'part-1')
    if (answer !== SOLUTION) {
      throw new error('E_WRONG_ANSWER')
    }
  });

  test('[d02/part_2]', async () => {
    const SOLUTION = 79315
    const answer = await main(_day, 'part-2')
    if (answer !== SOLUTION) {
      throw new error('E_WRONG_ANSWER')
    }
  });
})

