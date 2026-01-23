// Genre family colors as optional overrides
const familyColors = {
  jazz: '#d4a373',
  classical: '#9c6644',
  country: '#dda15e',
  hiphop: '#bc6c25',
  rnb: '#e76f51',
  blues: '#264653',
  folk: '#2a9d8f',
  reggae: '#e9c46a',
  latin: '#f4a261',
  electronic: '#06b6d4',
  rock: '#ef4444',
  metal: '#dc2626',
  punk: '#f97316',
  hardcore: '#c026d3',
  pop: '#ec4899',
  indie: '#8b5cf6',
  funk: '#fbbf24',
  world: '#10b981',
  ambient: '#6366f1',
  experimental: '#8b5cf6',
  gothic: '#701a75',
  industrial: '#374151',
  emo: '#64748b',
  newwave: '#c084fc',
  glam: '#f59e0b',
  dutch: '#f59e0b',
  children: '#fde047'
};

// Keywords for each family (matching emoji-map.js)
const genreFamilies = {
  jazz: ['jazz', 'bebop', 'swing', 'bossa'],
  classical: ['classical', 'orchestra', 'symphony', 'opera', 'baroque', 'chamber', 'philharmonic'],
  country: ['country', 'bluegrass', 'americana', 'honky', 'outlaw'],
  hiphop: ['hip hop', 'hip-hop', 'rap', 'trap', 'drill', 'grime'],
  rnb: ['r&b', 'rnb', 'soul', 'neo-soul', 'motown', 'neo soul'],
  blues: ['blues', 'delta blues', 'chicago blues'],
  folk: ['folk', 'acoustic', 'singer-songwriter'],
  reggae: ['reggae', 'dancehall', 'ska', 'dub', 'roots'],
  latin: ['latin', 'salsa', 'bachata', 'reggaeton', 'cumbia', 'bossa nova', 'merengue', 'tango'],
  electronic: ['electronic', 'edm', 'house', 'techno', 'trance', 'dubstep', 'dnb', 'drum and bass', 'breakbeat', 'bass music', 'drumstep', 'minimal techno', 'acid techno', 'hard techno', 'tekno'],
  rock: ['rock', 'grunge', 'alternative', 'classic rock', 'progressive rock', 'art rock', 'proto-punk'],
  metal: ['metal', 'metalcore', 'deathcore', 'death metal', 'black metal', 'thrash', 'doom', 'power metal'],
  punk: ['punk', 'post-punk', 'pop punk', 'skate punk', 'melodic hardcore'],
  hardcore: ['hardcore', 'hardcore punk', 'gabber'],
  pop: ['pop', 'synth', 'synthpop', 'europop', 'dance pop', 'electropop'],
  indie: ['indie', 'lo-fi', 'bedroom', 'indie rock', 'indie pop'],
  funk: ['funk', 'disco', 'boogie', 'p-funk'],
  world: ['afrobeat', 'african', 'indian', 'asian', 'celtic', 'world', 'tribal'],
  ambient: ['ambient', 'drone', 'soundscape', 'new age', 'meditation', 'chillout'],
  experimental: ['experimental', 'avant-garde', 'noise', 'idm', 'glitch'],
  gothic: ['gothic', 'goth', 'darkwave', 'gothic rock'],
  industrial: ['industrial', 'industrial metal', 'industrial rock', 'ebm'],
  emo: ['emo', 'screamo', 'emocore'],
  newwave: ['new wave', 'synth-pop', 'post-disco'],
  glam: ['glam', 'glam rock', 'glitter'],
  dutch: ['nederl', 'dutch', 'hollands', 'nederpop'],
  children: ['children', 'kids', 'nursery']
};

// Match genre to family
function matchGenreToFamily(genre) {
  const lowerGenre = genre.toLowerCase();

  for (const [familyName, keywords] of Object.entries(genreFamilies)) {
    for (const keyword of keywords) {
      if (lowerGenre.includes(keyword) || keyword.includes(lowerGenre)) {
        return familyName;
      }
    }
  }

  return null;
}

// Convert HSL to Hex
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r, g, b;

  if (h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  const toHex = (n) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Generate color from audio features (universal fallback)
function getColorFromFeatures(features) {
  if (!features) {
    return '#8b5cf6'; // Default purple
  }

  const energy = features.energy || 0.5;
  const valence = features.valence || 0.5;

  // HSL-based approach for smooth gradients
  // High valence = warm colors (red/orange/yellow), Low valence = cool colors (blue/purple/cyan)
  // Energy affects saturation and lightness

  let hue;
  if (valence > 0.5) {
    // Warm colors: yellow (60) to red (0)
    hue = Math.round(60 - (valence - 0.5) * 120);
  } else {
    // Cool colors: cyan (180) to purple (270)
    hue = Math.round(180 + (0.5 - valence) * 180);
  }

  // Ensure hue is in valid range
  hue = ((hue % 360) + 360) % 360;

  const saturation = 60 + (energy * 30); // 60-90%
  const lightness = 40 + (energy * 20);  // 40-60%

  return hslToHex(hue, saturation, lightness);
}

// Main export: get color for genre with optional audio feature fallback
export function getColorForGenre(genre, audioFeatures = null) {
  const familyName = matchGenreToFamily(genre);

  if (familyName && familyColors[familyName]) {
    return familyColors[familyName];
  }

  // Use audio features as fallback
  return getColorFromFeatures(audioFeatures);
}

// Export color generation function for direct use
export { getColorFromFeatures };

// Keep legacy export for backwards compatibility
export const genreColorMap = Object.fromEntries(
  Object.entries(genreFamilies).flatMap(([familyName, keywords]) =>
    keywords.map(keyword => [keyword, familyColors[familyName]])
  )
);
genreColorMap.default = '#8b5cf6';
