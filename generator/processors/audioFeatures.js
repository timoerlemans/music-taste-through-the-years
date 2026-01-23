const AUDIO_FEATURE_COLUMNS = [
  'Danceability',
  'Energy',
  'Valence',
  'Acousticness',
  'Tempo',
  'Speechiness',
  'Instrumentalness',
  'Liveness',
  'Loudness'
];

function parseNumber(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

function calculateAverage(values) {
  const validValues = values.filter(v => v !== null);
  if (validValues.length === 0) {
    return 0;
  }
  return validValues.reduce((sum, v) => sum + v, 0) / validValues.length;
}

export function processAudioFeatures(tracks) {
  const features = {};

  for (const column of AUDIO_FEATURE_COLUMNS) {
    const values = tracks.map(track => parseNumber(track[column]));
    const avg = calculateAverage(values);

    // Use camelCase for output keys
    const key = column.toLowerCase();
    features[key] = Math.round(avg * 1000) / 1000; // Round to 3 decimal places
  }

  return features;
}
