//! # Day 8
use std::collections::{HashSet, HashMap};

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct Point {
    pub x: i64,
    pub y: i64,
    pub z: i64,
}

impl Point {
    pub fn new(s: &str) -> Self {
        let mut parts = s.split(',');
        Self {
            x: parts.next().unwrap().parse().unwrap(),
            y: parts.next().unwrap().parse().unwrap(),
            z: parts.next().unwrap().parse().unwrap(),
        }
    }

    pub fn squared_distance(&self, other: &Point) -> i64 {
        let dx = other.x - self.x;
        let dy = other.y - self.y;
        let dz = other.z - self.z;
        dx * dx + dy * dy + dz * dz
    }
}

// ========== FONCTIONS COMMUNES ==========

/// Calcule toutes les distances entre toutes les paires de points √(dx^2 + dy^2 + dz^2)
fn create_connections(points: &[Point]) -> Vec<((usize, usize), i64)> {
    let mut connections = Vec::with_capacity(points.len() * (points.len() - 1) / 2);
    
    for i in 0..points.len() {
        for j in (i + 1)..points.len() {
            let distance = points[i].squared_distance(&points[j]);
            connections.push(((i, j), distance));
        }
    }
    
    connections.sort_unstable_by_key(|(_, dist)| *dist);
    connections
}

/// Construit un graphe à partir d'une liste de connexions { x: [y1, y2, y3, ...] }
fn create_graph(connections: &[((usize, usize), i64)]) -> HashMap<usize, HashSet<usize>> {
    let mut graph: HashMap<usize, HashSet<usize>> = HashMap::new();
    
    for ((i, j), _) in connections {
        graph.entry(*i).or_default().insert(*j);
        graph.entry(*j).or_default().insert(*i);
    }
    
    graph
}

/// Explorer une composante connexe et ses voisins
fn explore(node: usize, graph: &HashMap<usize, HashSet<usize>>, visited: &mut HashSet<usize>) {
    visited.insert(node);
    
    if let Some(neighbors) = graph.get(&node) {
        for &neighbor in neighbors {
            if !visited.contains(&neighbor) {
                explore(neighbor, graph, visited);
            }
        }
    }
}

/// Explore tous les points et retourne la taille des explorations (path)
fn get_graph_paths_sizes(graph: &HashMap<usize, HashSet<usize>>, num_points: usize) -> Vec<usize> {
    let mut graph_point_visited: HashSet<usize> = HashSet::new();
    let mut path_sizes = Vec::new();
    
    for i in 0..num_points {
        if !graph_point_visited.contains(&i) {
            let mut path_points = HashSet::new();
            explore(i, graph, &mut path_points);
            path_sizes.push(path_points.len());
            graph_point_visited.extend(&path_points);
        }
    }
    
    path_sizes
}

// ========== SOLUTIONS ==========

pub fn parse(input: &str) -> Vec<Point> {
    input.lines().map(Point::new).collect()
}

pub fn part1(points: &[Point]) -> i64 {
    let all_connections = create_connections(points);

    // Pour le test, prendre 10 connexions, sinon 1000
    let num_connections = if points.len() == 20 { 10 } else { 1000 };

    // Crer une représentation en graph des connexions
    let graph = create_graph(
        &all_connections[..num_connections.min(all_connections.len())]
    );
    
    // 
    let mut circuit_sizes = get_graph_paths_sizes(&graph, points.len());
    circuit_sizes.sort_by(|a, b| b.cmp(a));
    
    println!("Tailles des circuits: {:?}", circuit_sizes);
    println!("Nombre de circuits: {}", circuit_sizes.len());
    
    circuit_sizes.iter().take(3).product::<usize>() as i64
}

pub fn part2(points: &[Point]) -> i64 {
    let all_connections = create_connections(points);
    let mut graph: HashMap<usize, HashSet<usize>> = HashMap::new();
    
    for ((i, j), _) in all_connections.iter() {
        graph.entry(*i).or_default().insert(*j);
        graph.entry(*j).or_default().insert(*i);
        
        // Vérifier si on a 1 seul circuit
        if get_graph_paths_sizes(&graph, points.len()).len() == 1 {
            println!("Dernière connexion: {:?} <-> {:?}", points[*i], points[*j]);
            
            return points[*i].x * points[*j].x;
        }
    }
    
    0
}

#[cfg(test)]
mod tests {
    use super::*;

    const EXAMPLE: &str = "162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689";

    #[test]
    fn part1_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part1(&input), 40);
    }

    #[test]
    fn part2_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part2(&input), 25272);
    }
}
