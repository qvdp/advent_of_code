//! # Secret Entrance

#[derive(Debug)]
pub enum Direction {
    Left,
    Right,
}

#[derive(Debug)]
pub struct Instruction {
  pub direction: Direction,
  pub distance: i32,
}

fn parse_direction(ch: char) -> Option<Direction> {
    match ch {
      'L' => Some(Direction::Left),
      'R' => Some(Direction::Right),
      _ => None,
    }
}

pub fn parse(input: &str) -> Vec<Instruction> {
  input
    .lines()
    .map(|line| line.trim())
    .filter(|line| !line.is_empty())
    .filter_map(|line| {
        let direction = parse_direction(line.chars().next()?)?;
        let distance: i32 = line[1..].parse().ok()?;
        Some(Instruction { direction, distance })
    })
    .collect()
}

pub fn part1(input: &[Instruction]) -> i32 {
  let mut clicks = 0;
  let mut dial: i32 = 50;
    
  for instruction in input {     
    let delta = match instruction.direction {
      Direction::Left => -instruction.distance,
      Direction::Right => instruction.distance,
    };
    
    dial = (dial + delta).rem_euclid(100);
    
    if dial == 0 {
      clicks += 1;
    }
  }  
  clicks
}

pub fn part2(input: &[Instruction]) -> i32 {
  let mut clicks = 0;
  let mut dial: i32 = 50;
  
  for instruction in input {
    let delta = match instruction.direction {
        Direction::Left => -instruction.distance,
        Direction::Right => instruction.distance,
    };
    
    if delta >= 0 {
        clicks += (dial + delta) / 100;
    } else {
        let rest = (100 - dial) % 100;
        clicks += (rest - delta) / 100;
    }
    dial = (dial + delta).rem_euclid(100);

  }
  clicks
}



#[cfg(test)]
mod tests {
  use super::*;

  const EXAMPLE: &str = "\
  L68
  L30
  R48
  L5
  R60
  L55
  L1
  L99
  R14
  L82";

  #[test]
  fn part1_test() {
    let input = parse(EXAMPLE);
    assert_eq!(part1(&input), 3);
  }

  #[test]
  fn part2_test() {
    let input = parse(EXAMPLE);
    assert_eq!(part2(&input), 6);
  }
}
