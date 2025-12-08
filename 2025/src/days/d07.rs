//! # Day 7: Laboratories
use std::collections::HashMap;
use crate::util::grid::*;
use std::fmt;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Tile {
    Start,
    Splitter,
    Beam,
    Empty,
}

impl From<char> for Tile {
    fn from(c: char) -> Self {
        match c {
            'S' => Tile::Start,
            '^' => Tile::Splitter,
            '|' => Tile::Beam,
            _ => Tile::Empty,
        }
    }
}

impl fmt::Display for Tile {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let c = match self {
            Tile::Start => 'S',
            Tile::Splitter => '^',
            Tile::Beam => '|',
            Tile::Empty => '.',
        };
        write!(f, "{}", c)
    }
}

pub fn parse(input: &str) -> Grid<Tile> {
    Grid::new(input)
}

fn solve_grid(grid: &Grid<Tile>) -> Grid<Tile> {
    let mut solved = grid.clone();

    for point in grid.points() {
        let upper = Point::new(point.x, point.y - 1);
        
        if solved.contains(upper) {
            match solved[point] {
                Tile::Splitter => {
                    if solved[upper] == Tile::Beam {
                        let left = Point::new(point.x - 1, point.y);
                        let right = Point::new(point.x + 1, point.y);
                        
                        if solved.contains(left) { solved[left] = Tile::Beam; }
                        if solved.contains(right) { solved[right] = Tile::Beam; }
                    }
                },
                Tile::Empty => {
                    if matches!(solved[upper], Tile::Beam | Tile::Start) { solved[point] = Tile::Beam; }
                },
                _ => {}
            }
        }
    }

    solved
}

pub fn part1(grid: &Grid<Tile>) -> i32 {
    let solved = solve_grid(grid);
    
    solved.points()
        .filter(|&p| {
            if solved[p] != Tile::Splitter { return false; }
            
            let upper = Point::new(p.x, p.y - 1);
            solved.contains(upper) && solved[upper] == Tile::Beam
        })
        .count() as i32
}

pub fn part2(grid: &Grid<Tile>) -> i64 {
    let solved = solve_grid(grid);
    let mut cache: HashMap<Point, i64> = HashMap::new();
    
    fn find_paths_cached(
        point: Point, 
        grid: &Grid<Tile>, 
        cache: &mut HashMap<Point, i64>,
        depth: i32
    ) -> i64 {
        
        if let Some(&result) = cache.get(&point) {
            return result;
        }
        
        // Nominale case
        let result = if grid[point] == Tile::Start { return 1; }
        // Breaking case
        else if grid[point] != Tile::Beam { return 0; }
        // Identify next possible parts of path
        else {
            let neighbors: Vec<Point> = grid.neighbors(point, true)
                .into_iter()
                .filter(|p| p.y == point.y - 1)
                .filter(|&upper| {
                    if upper.x == point.x {
                        return true;
                    }
                    
                    let below_upper = Point::new(upper.x, upper.y + 1);
                    grid.contains(below_upper) && grid[below_upper] == Tile::Splitter
                })
                .collect();
            
            let total: i64 = neighbors
                .into_iter()
                .map(|upper| find_paths_cached(upper, grid, cache, depth + 1))
                .sum();
            
            total
        };

        cache.insert(point, result);
        result
    }
    
    let y = solved.height - 1;
    let bottom_beams: Vec<Point> = (0..solved.width)
        .map(|x| Point::new(x, y))
        .filter(|&p| solved[p] == Tile::Beam)
        .collect();
    
    bottom_beams
        .iter()
        .map(|p| find_paths_cached(*p, &solved, &mut cache, 0))
        .sum()
}


#[cfg(test)]
mod tests {
    use super::*;

    const EXAMPLE: &str = ".......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............";

    #[test]
    fn part1_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part1(&input), 21);
    }

    #[test]
    fn part2_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part2(&input), 30);
    }
}
