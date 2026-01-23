function parseArtists(artistString) {
  if (!artistString || artistString.trim() === '') {
    return [];
  }
  return artistString.split(';').map(a => a.trim()).filter(a => a.length > 0);
}

function parseGenres(genreString) {
  if (!genreString || genreString.trim() === '') {
    return [];
  }
  return genreString.split(',').map(g => g.trim().toLowerCase()).filter(g => g.length > 0);
}

export function processDiversity(tracks) {
  const uniqueArtists = new Set();
  const uniqueGenres = new Set();

  for (const track of tracks) {
    const artists = parseArtists(track['Artist Name(s)']);
    const genres = parseGenres(track.Genres);

    artists.forEach(a => uniqueArtists.add(a));
    genres.forEach(g => uniqueGenres.add(g));
  }

  return {
    trackCount: tracks.length,
    uniqueArtists: uniqueArtists.size,
    uniqueGenres: uniqueGenres.size
  };
}
