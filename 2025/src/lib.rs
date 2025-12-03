//! # Advent of Code 2025
//!
//! [![badge]][link]
//!
//! [badge]: https://img.shields.io/badge/github-blue?style=for-the-badge&logo=github&labelColor=grey
//! [link]: https://github.com/qvdp/advent_of_code

#![cfg_attr(feature = "simd", allow(unstable_features), feature(portable_simd))]
#![doc(html_logo_url = "https://maneatingape.github.io/advent-of-code-rust/logo.png")]

macro_rules! library {
    ($module:tt $description:literal $($item:tt),*) => {
        #[doc = concat!("# ", $description)]
        pub mod $module {
            $(pub mod $item;)*
        }
    }
}

library!(util "Utility modules to handle common recurring Advent of Code patterns."
    ansi, integer, parse
);

library!(days "All Advent of Code 2025 solutions."
    d01, d02, d03
);
