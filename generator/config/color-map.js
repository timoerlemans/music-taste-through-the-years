// Genre to color mapping for consistent visualization
export const genreColorMap = {
  // Rock & Metal
  'rock': '#ef4444',
  'metal': '#dc2626',
  'metalcore': '#b91c1c',
  'industrial metal': '#991b1b',
  'industrial': '#7f1d1d',
  'hardcore': '#c026d3',
  'hardcore punk': '#a21caf',
  'post-punk': '#be185d',
  'gothic rock': '#831843',
  'darkwave': '#701a75',

  // Punk
  'punk': '#f97316',
  'pop punk': '#fb923c',
  'skate punk': '#fdba74',
  'ska punk': '#fed7aa',
  'melodic hardcore': '#ea580c',

  // Electronic
  'techno': '#06b6d4',
  'minimal techno': '#22d3ee',
  'acid techno': '#67e8f9',
  'hard techno': '#0891b2',
  'tekno': '#0e7490',
  'industrial rock': '#155e75',
  'idm': '#164e63',
  'breakbeat': '#0d9488',
  'drum and bass': '#14b8a6',
  'bass music': '#2dd4bf',
  'drumstep': '#5eead4',
  'gabber': '#f43f5e',
  'europop': '#fb7185',

  // Dutch
  'nederpop': '#f59e0b',
  'hollands': '#fbbf24',

  // Pop & Indie
  'pop': '#ec4899',
  'indie': '#8b5cf6',
  'indie rock': '#a78bfa',
  'new wave': '#c084fc',
  'synthpop': '#d946ef',
  'art rock': '#a855f7',

  // Classic & Progressive
  'classic rock': '#84cc16',
  'progressive rock': '#a3e635',
  'proto-punk': '#65a30d',
  'glam rock': '#bef264',

  // Emo & Alternative
  'emo': '#64748b',
  'alternative': '#94a3b8',

  // Other
  'ska': '#facc15',
  'children\'s music': '#fde047',

  // Default
  'default': '#8b5cf6'
};

// Get color for a genre with fallback
export function getColorForGenre(genre) {
  const lowerGenre = genre.toLowerCase();

  // Exact match
  if (genreColorMap[lowerGenre]) {
    return genreColorMap[lowerGenre];
  }

  // Partial match
  for (const [key, color] of Object.entries(genreColorMap)) {
    if (lowerGenre.includes(key) || key.includes(lowerGenre)) {
      return color;
    }
  }

  return genreColorMap.default;
}
