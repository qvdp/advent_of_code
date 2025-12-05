use std::fmt;
use std::ops::{Index, IndexMut};

// =========================================================
// 1. POINT
// =========================================================

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Point {
    pub x: i32,
    pub y: i32,
}

impl Point {
    pub const fn new(x: i32, y: i32) -> Self {
        Self { x, y }
    }
}

// Affichage joli : (1, 2)
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

// =========================================================
// 2. GRID
// =========================================================

#[derive(Debug, Clone)]
pub struct Grid<T> {
    pub width: i32,
    pub height: i32,
    pub data: Vec<T>,
}

impl<T: From<char>> Grid<T> {
    pub fn new(input: &str) -> Self {
        let lines: Vec<&str> = input
            .lines()
            .map(str::trim)
            .filter(|l| !l.is_empty())
            .collect();
        let height = lines.len() as i32;
        let width = lines[0].len() as i32;

        let mut data = Vec::with_capacity((width * height) as usize);
        for line in lines {
            for c in line.chars() {
                data.push(T::from(c));
            }
        }

        Self {
            width,
            height,
            data,
        }
    }
}

impl<T> Grid<T> {
    // Vérifie les bornes
    pub fn contains(&self, p: Point) -> bool {
        p.x >= 0 && p.x < self.width && p.y >= 0 && p.y < self.height
    }

    // Conversion 2D -> 1D
    fn convert_to_index(&self, p: Point) -> usize {
        (p.y * self.width + p.x) as usize
    }

    pub fn points(&self) -> impl Iterator<Item = Point> {
        let w = self.width;
        let h = self.height;
        // flat_map permet d'aplatir la double boucle (y, x) en une seule liste
        (0..h).flat_map(move |y| (0..w).map(move |x| Point::new(x, y)))
    }

    pub fn neighbors(&self, p: Point, include_diagonals: bool) -> Vec<Point> {
        let mut neighbors = Vec::with_capacity(if include_diagonals { 8 } else { 4 });

        let deltas = if include_diagonals {
            // Les 8 directions
            vec![
                (-1, -1),
                (0, -1),
                (1, -1),
                (-1, 0),
                (1, 0),
                (-1, 1),
                (0, 1),
                (1, 1),
            ]
        } else {
            // Les 4 directions (Haut, Bas, Gauche, Droite)
            vec![(0, -1), (-1, 0), (1, 0), (0, 1)]
        };

        for (dx, dy) in deltas {
            let neighbor = Point::new(p.x + dx, p.y + dy);
            if self.contains(neighbor) {
                neighbors.push(neighbor);
            }
        }
        neighbors
    }
}

// =========================================================
// 3. TRAITS (La "Magie" syntaxique)
// =========================================================

// read access : grid[point] -> T
impl<T> Index<Point> for Grid<T> {
    type Output = T;
    fn index(&self, index: Point) -> &Self::Output {
        &self.data[self.convert_to_index(index)]
    }
}

// write acces: grid[point] = val
impl<T> IndexMut<Point> for Grid<T> {
    fn index_mut(&mut self, index: Point) -> &mut Self::Output {
        let idx = self.convert_to_index(index);
        &mut self.data[idx]
    }
}

// print grid
impl<T: fmt::Display> Grid<T> {
    pub fn print(&self) {
        for y in 0..self.height {
            for x in 0..self.width {
                print!("{}", self[Point::new(x, y)]);
            }
            println!();
        }
    }
}
