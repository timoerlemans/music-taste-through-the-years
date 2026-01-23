export const emojiMap = {
  // Rock & Metal
  'rock': '🎸',
  'metal': '🤘',
  'metalcore': '🔥',
  'industrial metal': '⚙️',
  'industrial': '🏭',
  'hardcore': '💥',
  'hardcore punk': '💥',
  'post-punk': '🖤',
  'gothic rock': '🦇',
  'darkwave': '🌑',

  // Punk
  'punk': '🎸',
  'pop punk': '🛹',
  'skate punk': '🛹',
  'ska punk': '🎺',
  'melodic hardcore': '🎤',

  // Electronic
  'techno': '⚡',
  'minimal techno': '🎛️',
  'acid techno': '🧪',
  'hard techno': '💿',
  'tekno': '🔊',
  'idm': '🧠',
  'breakbeat': '🥁',
  'drum and bass': '🥁',
  'bass music': '🔈',
  'drumstep': '🎚️',
  'gabber': '😤',
  'europop': '🇪🇺',

  // Dutch
  'nederpop': '🇳🇱',
  'hollands': '🌷',

  // Pop & Indie
  'pop': '🎤',
  'indie': '🎹',
  'indie rock': '🎹',
  'new wave': '🌊',
  'synthpop': '🎹',
  'art rock': '🎨',

  // Classic & Progressive
  'classic rock': '📻',
  'progressive rock': '🌀',
  'proto-punk': '🎙️',
  'glam rock': '✨',

  // Emo & Alternative
  'emo': '🖤',
  'alternative': '🔮',

  // Other
  'ska': '🎺',
  'children\'s music': '🧒',

  // Default
  'default': '🎵'
};

export function getEmojiForGenre(genre) {
  const lowerGenre = genre.toLowerCase();

  // Exact match
  if (emojiMap[lowerGenre]) {
    return emojiMap[lowerGenre];
  }

  // Partial match
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (lowerGenre.includes(key) || key.includes(lowerGenre)) {
      return emoji;
    }
  }

  return emojiMap.default;
}
