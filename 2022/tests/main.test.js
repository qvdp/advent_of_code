import main from '../src/index.js'

test('[01/part_1] should work', async () => {
  const DAY = 'd01'
  const PART_1 = 'part-1'
  const EXPECTED = 69501
  const answer = await main(DAY, PART_1)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[01/part_2] should work', async () => {
  const DAY = 'd01'
  const PART_2 = 'part-2'
  const EXPECTED = 202346
  const answer = await main(DAY, PART_2)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[02/part_1] should work', async () => {
  const DAY = 'd02'
  const PART_1 = 'part-1'
  const EXPECTED = 13005
  const answer = await main(DAY, PART_1)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[02/part_2] should work', async () => {
  const DAY = 'd02'
  const PART_2 = 'part-2'
  const EXPECTED = 11373
  const answer = await main(DAY, PART_2)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[03/part_1] should work', async () => {
  const DAY = 'd03'
  const PART_1 = 'part-1'
  const EXPECTED = 7967
  const answer = await main(DAY, PART_1)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[03/part_2] should work', async () => {
  const DAY = 'd03'
  const PART_2 = 'part-2'
  const EXPECTED = 2716
  const answer = await main(DAY, PART_2)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[04/part_1] should work', async () => {
  const DAY = 'd04'
  const PART_1 = 'part-1'
  const EXPECTED = 483
  const answer = await main(DAY, PART_1)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[04/part_2] should work', async () => {
  const DAY = 'd04'
  const PART_2 = 'part-2'
  const EXPECTED = 874
  const answer = await main(DAY, PART_2)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[05/part_1] should work', async () => {
  const DAY = 'd05'
  const PART_1 = 'part-1'
  const EXPECTED = 'FWNSHLDNZ'
  const answer = await main(DAY, PART_1)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[05/part_2] should work', async () => {
  const DAY = 'd05'
  const PART_2 = 'part-2'
  const EXPECTED = 'RNRGDNFQG'
  const answer = await main(DAY, PART_2)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[06/part_1] should work', async () => {
  const DAY = 'd06'
  const PART_1 = 'part-1'
  const EXPECTED = 1262
  const answer = await main(DAY, PART_1)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[06/part_2] should work', async () => {
  const DAY = 'd06'
  const PART_2 = 'part-2'
  const EXPECTED = 3444
  const answer = await main(DAY, PART_2)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[07/part_1] should work', async () => {
  const DAY = 'd07'
  const PART_1 = 'part-1'
  const EXPECTED = 1908462
  const answer = await main(DAY, PART_1)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[07/part_2] should work', async () => {
  const DAY = 'd07'
  const PART_2 = 'part-2'
  const EXPECTED = 3979145
  const answer = await main(DAY, PART_2)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[08/part_1] should work', async () => {
  const DAY = 'd08'
  const PART_1 = 'part-1'
  const EXPECTED = 1681
  const answer = await main(DAY, PART_1)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});

test('[08/part_2] should work', async () => {
  const DAY = 'd08'
  const PART_2 = 'part-2'
  const EXPECTED = 201684
  const answer = await main(DAY, PART_2)
  if (answer !== EXPECTED) {
    throw new error('E_WRONG_ANSWER')
  }
});