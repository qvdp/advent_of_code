//! # Advent of Code 2025
//!
//! [link]
//!
//! [link]: https://github.com/qvdp/advent_of_code

macro_rules! library {
  ($module:tt $description:literal $($item:tt),*) => {
    #[doc = concat!("# ", $description)]
    pub mod $module {
      $(pub mod $item;)*
    }
  }
}

library!(util "Utility modules to handle common recurring Advent of Code patterns."
  ansi, integer, parse, grid
);

library!(days "All Advent of Code 2025 solutions."
  d01, d02, d03, d04, d05, d06, d07
);
