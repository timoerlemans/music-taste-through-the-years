import { getEmojiForGenre } from '../config/emoji-map.js';
import { getColorForGenre } from '../config/color-map.js';
import { getMoodFromFeatures } from '../config/mood-rules.js';

function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateLabel(topGenres) {
  if (!topGenres || topGenres.length === 0) {
    return 'Mixed';
  }

  const top = topGenres[0];
  const second = topGenres[1];

  // If top genre is dominant (>40%), use it alone
  if (top.percentage >= 40) {
    return capitalizeWords(top.name);
  }

  // If top two are close, combine them
  if (second && top.percentage - second.percentage < 15) {
    return `${capitalizeWords(top.name)} / ${capitalizeWords(second.name)}`;
  }

  return capitalizeWords(top.name);
}

function generateBackground(color) {
  // Create a gradient from the genre color
  return `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`;
}

export function generateLabels(genreData, audioFeatures) {
  const { topGenres } = genreData;

  const primaryGenre = topGenres[0]?.name || 'mixed';
  const label = generateLabel(topGenres);
  const emoji = getEmojiForGenre(primaryGenre, audioFeatures);
  const color = getColorForGenre(primaryGenre, audioFeatures);
  const background = generateBackground(color);
  const mood = getMoodFromFeatures(audioFeatures, topGenres);

  return {
    label,
    emoji,
    color,
    background,
    mood
  };
}
