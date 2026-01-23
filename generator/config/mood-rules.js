const genreMoods = {
  // Rock & Metal
  'punk': 'Rebellious',
  'pop punk': 'Energetic',
  'hardcore': 'Aggressive',
  'metal': 'Intense',
  'metalcore': 'Intense',
  'classic rock': 'Classic',
  'progressive rock': 'Complex',
  'rock': 'Raw',
  'grunge': 'Gritty',
  'alternative': 'Eclectic',

  // Electronic
  'techno': 'Danceable',
  'minimal techno': 'Hypnotic',
  'house': 'Groovy',
  'trance': 'Euphoric',
  'dubstep': 'Heavy',
  'drum and bass': 'Frenetic',
  'edm': 'Energetic',
  'electronic': 'Synthetic',
  'gabber': 'Hardcore',

  // Dark & Gothic
  'industrial': 'Dark',
  'gothic rock': 'Melancholic',
  'darkwave': 'Atmospheric',
  'goth': 'Brooding',

  // Emotional & Indie
  'emo': 'Emotional',
  'indie': 'Introspective',
  'indie rock': 'Thoughtful',
  'lo-fi': 'Mellow',

  // Pop & Dance
  'pop': 'Upbeat',
  'synthpop': 'Electronic',
  'europop': 'Catchy',
  'disco': 'Funky',
  'dance pop': 'Fun',

  // Dutch
  'nederpop': 'Fun',
  'hollands': 'Nostalgic',
  'dutch': 'Local',

  // New genres - Jazz & Classical
  'jazz': 'Smooth',
  'bebop': 'Virtuosic',
  'swing': 'Swinging',
  'classical': 'Refined',
  'orchestra': 'Grand',
  'symphony': 'Majestic',
  'opera': 'Dramatic',
  'baroque': 'Ornate',
  'chamber': 'Intimate',

  // Country & Folk
  'country': 'Heartfelt',
  'bluegrass': 'Authentic',
  'americana': 'Rootsy',
  'folk': 'Intimate',
  'acoustic': 'Stripped-down',
  'singer-songwriter': 'Personal',

  // Hip Hop & R&B
  'hip hop': 'Bold',
  'hip-hop': 'Bold',
  'rap': 'Fierce',
  'trap': 'Hard',
  'drill': 'Menacing',
  'grime': 'Raw',
  'r&b': 'Soulful',
  'rnb': 'Soulful',
  'soul': 'Soulful',
  'neo-soul': 'Smooth',
  'motown': 'Classic',

  // Blues
  'blues': 'Soulful',
  'delta blues': 'Raw',
  'chicago blues': 'Electric',

  // Reggae & Latin
  'reggae': 'Chill',
  'dancehall': 'Vibrant',
  'ska': 'Upbeat',
  'dub': 'Spacey',
  'latin': 'Passionate',
  'salsa': 'Fiery',
  'bachata': 'Romantic',
  'reggaeton': 'Infectious',
  'cumbia': 'Festive',
  'bossa nova': 'Breezy',

  // Funk
  'funk': 'Groovy',
  'boogie': 'Danceable',
  'p-funk': 'Funky',

  // World
  'afrobeat': 'Rhythmic',
  'african': 'Vibrant',
  'indian': 'Meditative',
  'celtic': 'Mystical',
  'world': 'Global',

  // Ambient & Experimental
  'ambient': 'Atmospheric',
  'drone': 'Meditative',
  'soundscape': 'Immersive',
  'new age': 'Peaceful',
  'meditation': 'Tranquil',
  'experimental': 'Avant-garde',
  'avant-garde': 'Challenging',
  'noise': 'Abrasive',
  'idm': 'Cerebral',

  // Retro & Glam
  'new wave': 'Retro',
  'glam rock': 'Flamboyant',
  'glam': 'Theatrical',

  // Children's
  'children': 'Playful',
  'kids': 'Fun'
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
