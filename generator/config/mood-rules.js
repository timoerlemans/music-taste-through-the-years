const genreMoods = {
  'punk': 'Rebellious',
  'pop punk': 'Energetic',
  'hardcore': 'Aggressive',
  'metal': 'Intense',
  'metalcore': 'Intense',
  'techno': 'Danceable',
  'minimal techno': 'Hypnotic',
  'industrial': 'Dark',
  'gothic rock': 'Melancholic',
  'darkwave': 'Atmospheric',
  'emo': 'Emotional',
  'indie': 'Introspective',
  'pop': 'Upbeat',
  'nederpop': 'Fun',
  'hollands': 'Nostalgic',
  'classic rock': 'Classic',
  'progressive rock': 'Complex',
  'new wave': 'Retro',
  'synthpop': 'Electronic',
  'gabber': 'Hardcore',
  'europop': 'Catchy'
};

function getDescriptorFromFeatures(features) {
  const descriptors = [];

  // Energy-based
  if (features.energy > 0.8) {
    descriptors.push('High Energy');
  } else if (features.energy > 0.6) {
    descriptors.push('Energetic');
  } else if (features.energy < 0.3) {
    descriptors.push('Calm');
  }

  // Valence-based (happiness)
  if (features.valence > 0.7) {
    descriptors.push('Uplifting');
  } else if (features.valence > 0.5) {
    descriptors.push('Positive');
  } else if (features.valence < 0.35) {
    descriptors.push('Dark');
  } else if (features.valence < 0.45) {
    descriptors.push('Moody');
  }

  // Acousticness
  if (features.acousticness > 0.5) {
    descriptors.push('Acoustic');
  } else if (features.acousticness > 0.3) {
    descriptors.push('Organic');
  }

  // Danceability
  if (features.danceability > 0.7) {
    descriptors.push('Danceable');
  }

  // Instrumentalness
  if (features.instrumentalness > 0.5) {
    descriptors.push('Instrumental');
  }

  // Tempo-based
  if (features.tempo > 140) {
    descriptors.push('Fast');
  } else if (features.tempo < 100) {
    descriptors.push('Slow');
  }

  return descriptors;
}

function getGenreMood(topGenres) {
  for (const genre of topGenres) {
    const lowerName = genre.name.toLowerCase();

    // Exact match
    if (genreMoods[lowerName]) {
      return genreMoods[lowerName];
    }

    // Partial match
    for (const [key, mood] of Object.entries(genreMoods)) {
      if (lowerName.includes(key) || key.includes(lowerName)) {
        return mood;
      }
    }
  }

  return null;
}

export function getMoodFromFeatures(features, topGenres) {
  const descriptors = getDescriptorFromFeatures(features);
  const genreMood = getGenreMood(topGenres);

  // Combine genre mood with audio descriptors
  const allDescriptors = [];

  if (genreMood) {
    allDescriptors.push(genreMood);
  }

  // Add unique descriptors from audio features
  for (const desc of descriptors) {
    if (!allDescriptors.includes(desc) && allDescriptors.length < 3) {
      allDescriptors.push(desc);
    }
  }

  // Ensure we have at least one descriptor
  if (allDescriptors.length === 0) {
    allDescriptors.push('Eclectic');
  }

  return allDescriptors.slice(0, 3).join(' · ');
}
