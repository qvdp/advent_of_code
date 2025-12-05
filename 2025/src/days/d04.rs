//! # Day 4: Printing Department
use crate::util::grid::*;
use std::fmt;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Tile {
    Roll,
    Empty,
}

impl From<char> for Tile {
    fn from(c: char) -> Self {
        match c {
            '@' => Tile::Roll,
            _ => Tile::Empty,
        }
    }
}

impl fmt::Display for Tile {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let c = match self {
            Tile::Roll => '@',
            Tile::Empty => '.',
        };
        write!(f, "{}", c)
    }
}

pub fn parse(input: &str) -> Grid<Tile> {
    Grid::new(input)
}

pub fn part1(grid: &Grid<Tile>) -> i32 {
    let mut count: i32 = 0;

    for p in grid.points() {
        if grid[p] == Tile::Roll {
            let neighbors_rolls_count = grid
                .neighbors(p, true)
                .iter()
                .filter(|&&p| grid[p] == Tile::Roll)
                .count();
            count += i32::from(neighbors_rolls_count < 4);
        }
    }
    count
}

pub fn part2(grid: &Grid<Tile>) -> i32 {
    let mut count: i32 = 0;
    let mut current_grid = grid.clone();

    loop {
        let mut has_removed = false;
        let mut next_grid = current_grid.clone();

        for p in current_grid.points() {
            if current_grid[p] == Tile::Roll {
                let neighbors_rolls_count = current_grid
                    .neighbors(p, true)
                    .iter()
                    .filter(|&&p| current_grid[p] == Tile::Roll)
                    .count();

                if neighbors_rolls_count < 4 {
                    has_removed = true;
                    next_grid[p] = Tile::Empty;
                    count += 1;
                }
            }
        }

        if !has_removed {
            break;
        }

        current_grid = next_grid;
    }
    count
}

#[cfg(test)]
mod tests {
    use super::*;

    const EXAMPLE: &str = "..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.";

    #[test]
    fn part1_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part1(&input), 13);
    }

    #[test]
    fn part2_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part2(&input), 43);
    }
}
