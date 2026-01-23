function parseArtists(artistString) {
  if (!artistString || artistString.trim() === '') {
    return [];
  }

  return artistString
    .split(';')
    .map(a => a.trim())
    .filter(a => a.length > 0);
}

export function processArtists(tracks, year) {
  const artistScores = new Map();
  const artistTracks = new Map();
  const artistAppearances = new Map();

  tracks.forEach((track, index) => {
    const position = index + 1; // 1-indexed position
    const score = 101 - position; // Position 1 = 100 points, position 100 = 1 point
    const artists = parseArtists(track['Artist Name(s)']);
    const trackName = track['Track Name'] || 'Unknown Track';

    for (const artist of artists) {
      // Accumulate score
      artistScores.set(artist, (artistScores.get(artist) || 0) + score);

      // Track appearances
      artistAppearances.set(artist, (artistAppearances.get(artist) || 0) + 1);

      // Store best track (highest position = lowest index = first occurrence)
      if (!artistTracks.has(artist)) {
        artistTracks.set(artist, trackName);
      }
    }
  });

  // Sort by score descending
  const sortedArtists = Array.from(artistScores.entries())
    .sort((a, b) => b[1] - a[1]);

  // Top 10 artists for this year
  const topArtists = sortedArtists.slice(0, 10).map(([name, score], index) => ({
    rank: index + 1,
    name,
    topTrack: artistTracks.get(name),
    appearances: artistAppearances.get(name),
    score
  }));

  return {
    topArtists,
    artistScores: Object.fromEntries(artistScores),
    uniqueArtists: artistScores.size
  };
}

export function calculateRecurringArtists(allArtistData) {
  const artistYears = new Map();

  for (const { year, artistScores } of allArtistData) {
    for (const artist of Object.keys(artistScores)) {
      if (!artistYears.has(artist)) {
        artistYears.set(artist, []);
      }
      artistYears.get(artist).push(year);
    }
  }

  // Filter artists appearing in 3+ years
  const recurring = Array.from(artistYears.entries())
    .filter(([, years]) => years.length >= 3)
    .map(([name, years]) => ({
      name,
      years: years.sort((a, b) => a - b),
      yearCount: years.length
    }))
    .sort((a, b) => b.yearCount - a.yearCount);

  return recurring;
}

export function calculateTopArtistsAllTime(allArtistData) {
  const totalScores = new Map();
  const artistYears = new Map();

  for (const { year, artistScores } of allArtistData) {
    for (const [artist, score] of Object.entries(artistScores)) {
      totalScores.set(artist, (totalScores.get(artist) || 0) + score);

      if (!artistYears.has(artist)) {
        artistYears.set(artist, []);
      }
      artistYears.get(artist).push(year);
    }
  }

  // Sort by total score descending
  const sorted = Array.from(totalScores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, score], index) => ({
      rank: index + 1,
      name,
      score,
      years: artistYears.get(name).sort((a, b) => a - b),
      yearCount: artistYears.get(name).length
    }));

  return sorted;
}
