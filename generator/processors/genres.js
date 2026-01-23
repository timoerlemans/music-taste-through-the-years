import { genreColorMap } from '../config/color-map.js';

function parseGenres(genreString) {
  if (!genreString || genreString.trim() === '') {
    return [];
  }

  return genreString
    .split(',')
    .map(g => g.trim().toLowerCase())
    .filter(g => g.length > 0);
}

function getGenreColor(genre) {
  // Check for exact match first
  if (genreColorMap[genre]) {
    return genreColorMap[genre];
  }

  // Check for partial matches (e.g., "pop punk" matches "punk")
  for (const [key, color] of Object.entries(genreColorMap)) {
    if (genre.includes(key) || key.includes(genre)) {
      return color;
    }
  }

  // Default color
  return '#8b5cf6'; // Purple as fallback
}

export function processGenres(tracks) {
  const genreCounts = new Map();
  const allGenres = new Set();
  let totalGenreOccurrences = 0;

  for (const track of tracks) {
    const genres = parseGenres(track.Genres);

    for (const genre of genres) {
      allGenres.add(genre);
      genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
      totalGenreOccurrences++;
    }
  }

  // Sort by count descending
  const sortedGenres = Array.from(genreCounts.entries())
    .sort((a, b) => b[1] - a[1]);

  // Top 5 genres with percentages
  const topGenres = sortedGenres.slice(0, 5).map(([name, count]) => ({
    name,
    count,
    percentage: totalGenreOccurrences > 0
      ? Math.round((count / totalGenreOccurrences) * 100)
      : 0,
    color: getGenreColor(name)
  }));

  // Top 3 subgenres for tags (more specific genres)
  // Prefer genres with spaces or hyphens as they're usually more specific
  const subgenres = sortedGenres
    .filter(([name]) => name.includes(' ') || name.includes('-'))
    .slice(0, 3)
    .map(([name]) => name);

  // If we don't have enough subgenres, add from top genres
  if (subgenres.length < 3) {
    for (const [name] of sortedGenres) {
      if (!subgenres.includes(name) && subgenres.length < 3) {
        subgenres.push(name);
      }
    }
  }

  return {
    topGenres,
    subgenres,
    uniqueGenres: allGenres.size,
    genreCounts: Object.fromEntries(genreCounts)
  };
}
