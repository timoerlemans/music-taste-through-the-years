# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Universal genre mapping system with ~25 genre families and keyword matching
- Audio-feature-driven fallback for unknown genres (emoji and color)
- HSL-based color generation from audio features (energy/valence)
- Expanded mood vocabulary with support for jazz, classical, country, hip-hop, R&B, blues, folk, reggae, latin, funk, ambient, world music, and more

### Changed
- Refactored `emoji-map.js` to use genre families with keyword matching instead of specific mappings
- Refactored `color-map.js` to use genre family colors with audio-feature fallback
- Updated `labels.js` to pass audio features to emoji/color functions for fallback support
- Expanded `mood-rules.js` genreMoods from ~22 to ~100+ genre-mood mappings

### Technical Details
- Genre families use keyword arrays for flexible matching (e.g., "jazz" matches "smooth jazz", "acid jazz")
- Color fallback uses HSL color space for smooth gradients based on valence (warm/cool) and energy (saturation/lightness)
- Emoji fallback considers acousticness, instrumentalness, energy, danceability, and valence
