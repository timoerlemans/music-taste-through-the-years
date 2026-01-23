// Genre families with keyword arrays for universal matching
const genreFamilies = {
  jazz: { keywords: ['jazz', 'bebop', 'swing', 'bossa'], emoji: '🎷' },
  classical: { keywords: ['classical', 'orchestra', 'symphony', 'opera', 'baroque', 'chamber', 'philharmonic'], emoji: '🎻' },
  country: { keywords: ['country', 'bluegrass', 'americana', 'honky', 'outlaw'], emoji: '🤠' },
  hiphop: { keywords: ['hip hop', 'hip-hop', 'rap', 'trap', 'drill', 'grime'], emoji: '🎤' },
  rnb: { keywords: ['r&b', 'rnb', 'soul', 'neo-soul', 'motown', 'neo soul'], emoji: '🎙️' },
  blues: { keywords: ['blues', 'delta blues', 'chicago blues'], emoji: '🎸' },
  folk: { keywords: ['folk', 'acoustic', 'singer-songwriter', 'americana'], emoji: '🪕' },
  reggae: { keywords: ['reggae', 'dancehall', 'ska', 'dub', 'roots'], emoji: '🇯🇲' },
  latin: { keywords: ['latin', 'salsa', 'bachata', 'reggaeton', 'cumbia', 'bossa nova', 'merengue', 'tango'], emoji: '💃' },
  electronic: { keywords: ['electronic', 'edm', 'house', 'techno', 'trance', 'dubstep', 'dnb', 'drum and bass', 'breakbeat', 'bass music', 'drumstep', 'minimal techno', 'acid techno', 'hard techno', 'tekno'], emoji: '⚡' },
  rock: { keywords: ['rock', 'grunge', 'alternative', 'classic rock', 'progressive rock', 'art rock', 'proto-punk'], emoji: '🎸' },
  metal: { keywords: ['metal', 'metalcore', 'deathcore', 'death metal', 'black metal', 'thrash', 'doom', 'power metal'], emoji: '🤘' },
  punk: { keywords: ['punk', 'post-punk', 'pop punk', 'skate punk', 'melodic hardcore'], emoji: '🔥' },
  hardcore: { keywords: ['hardcore', 'hardcore punk', 'gabber'], emoji: '💥' },
  pop: { keywords: ['pop', 'synth', 'synthpop', 'europop', 'dance pop', 'electropop'], emoji: '🎤' },
  indie: { keywords: ['indie', 'lo-fi', 'bedroom', 'indie rock', 'indie pop'], emoji: '🎹' },
  funk: { keywords: ['funk', 'disco', 'boogie', 'p-funk'], emoji: '🕺' },
  world: { keywords: ['afrobeat', 'african', 'indian', 'asian', 'celtic', 'world', 'tribal'], emoji: '🌍' },
  ambient: { keywords: ['ambient', 'drone', 'soundscape', 'new age', 'meditation', 'chillout'], emoji: '🌌' },
  experimental: { keywords: ['experimental', 'avant-garde', 'noise', 'idm', 'glitch'], emoji: '🧪' },
  gothic: { keywords: ['gothic', 'goth', 'darkwave', 'gothic rock', 'post-punk'], emoji: '🦇' },
  industrial: { keywords: ['industrial', 'industrial metal', 'industrial rock', 'ebm'], emoji: '⚙️' },
  emo: { keywords: ['emo', 'screamo', 'emocore'], emoji: '🖤' },
  newwave: { keywords: ['new wave', 'synth-pop', 'post-disco'], emoji: '🌊' },
  glam: { keywords: ['glam', 'glam rock', 'glitter'], emoji: '✨' },
  // Dutch specific
  dutch: { keywords: ['nederl', 'dutch', 'hollands', 'nederpop'], emoji: '🇳🇱' },
  // Children's
  children: { keywords: ['children', 'kids', 'nursery'], emoji: '🧒' }
};

// Match genre to family using keywords
function matchGenreToFamily(genre) {
  const lowerGenre = genre.toLowerCase();

  for (const [familyName, family] of Object.entries(genreFamilies)) {
    for (const keyword of family.keywords) {
      if (lowerGenre.includes(keyword) || keyword.includes(lowerGenre)) {
        return family;
      }
    }
  }

  return null;
}

// Fallback emoji based on audio features
function getEmojiFromFeatures(features) {
  if (!features) return '🎵';

  if (features.acousticness > 0.6) return '🎸';  // Acoustic
  if (features.instrumentalness > 0.6) return '🎹';  // Instrumental
  if (features.energy > 0.8) return '⚡';  // High energy
  if (features.danceability > 0.7) return '🕺';  // Danceable
  if (features.valence < 0.3) return '🌑';  // Dark/sad
  if (features.valence > 0.7) return '☀️';  // Happy
  return '🎵';  // Generic
}

// Main export: get emoji for genre with optional audio feature fallback
export function getEmojiForGenre(genre, audioFeatures = null) {
  const family = matchGenreToFamily(genre);

  if (family) {
    return family.emoji;
  }

  // Use audio features as fallback
  return getEmojiFromFeatures(audioFeatures);
}

// Keep legacy export for backwards compatibility during migration
export const emojiMap = Object.fromEntries(
  Object.entries(genreFamilies).flatMap(([_, family]) =>
    family.keywords.map(keyword => [keyword, family.emoji])
  )
);
emojiMap.default = '🎵';
