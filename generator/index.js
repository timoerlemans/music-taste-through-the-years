import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import { processAudioFeatures } from './processors/audioFeatures.js';
import { processGenres } from './processors/genres.js';
import { processArtists, calculateRecurringArtists, calculateTopArtistsAllTime } from './processors/artists.js';
import { generateLabels } from './processors/labels.js';
import { processDiversity } from './processors/diversity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'data', 'generated.json');
const CONFIG_FILE = path.join(ROOT_DIR, 'config', 'overrides.json');

const CSV_PATTERN = /^Your_Top_Songs_(\d{4})\.csv$/;

function scanForCSVs() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`Error: Data directory not found: ${DATA_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR);
  const csvFiles = [];

  for (const file of files) {
    const match = file.match(CSV_PATTERN);
    if (match) {
      csvFiles.push({
        filename: file,
        year: parseInt(match[1], 10),
        path: path.join(DATA_DIR, file)
      });
    }
  }

  return csvFiles.sort((a, b) => a.year - b.year);
}

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const result = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim()
  });

  if (result.errors.length > 0) {
    console.warn(`Warnings parsing ${filePath}:`, result.errors);
  }

  return result.data;
}

function processYear(year, tracks) {
  const audioFeatures = processAudioFeatures(tracks);
  const genreData = processGenres(tracks);
  const artistData = processArtists(tracks, year);
  const diversityData = processDiversity(tracks);
  const labelData = generateLabels(genreData, audioFeatures);

  return {
    year,
    label: labelData.label,
    emoji: labelData.emoji,
    color: labelData.color,
    background: labelData.background,
    mood: labelData.mood,
    trackCount: diversityData.trackCount,
    uniqueArtists: diversityData.uniqueArtists,
    uniqueGenres: diversityData.uniqueGenres,
    audioFeatures,
    topGenres: genreData.topGenres,
    subgenres: genreData.subgenres,
    topArtists: artistData.topArtists
  };
}

function loadOverrides() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return null;
  }

  try {
    const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Warning: Could not parse overrides file: ${error.message}`);
    return null;
  }
}

function applyOverrides(yearData, overrides) {
  if (!overrides || !overrides.years) {
    return yearData;
  }

  return yearData.map(year => {
    const yearOverride = overrides.years[year.year.toString()];
    if (yearOverride) {
      return {
        ...year,
        label: yearOverride.label ?? year.label,
        emoji: yearOverride.emoji ?? year.emoji,
        mood: yearOverride.mood ?? year.mood,
        color: yearOverride.color ?? year.color,
        background: yearOverride.background ?? year.background
      };
    }
    return year;
  });
}

function calculateOverview(years, allArtistData) {
  const totalTracks = years.reduce((sum, y) => sum + y.trackCount, 0);
  const yearRange = `${years[0].year} — ${years[years.length - 1].year}`;

  const topArtistsAllTime = calculateTopArtistsAllTime(allArtistData);
  const recurringArtists = calculateRecurringArtists(allArtistData);

  // Find the most loyal artist (highest total score)
  const loyalArtist = topArtistsAllTime[0];

  // Find dominant phase (year with most unique genres or specific characteristic)
  const dominantPhase = years.reduce((max, y) =>
    y.uniqueGenres > max.uniqueGenres ? y : max, years[0]);

  return {
    totalTracks,
    yearRange,
    yearsCount: years.length,
    loyalArtist: loyalArtist ? {
      name: loyalArtist.name,
      score: loyalArtist.score,
      years: loyalArtist.years
    } : null,
    dominantPhase: {
      year: dominantPhase.year,
      uniqueGenres: dominantPhase.uniqueGenres
    },
    topArtistsAllTime: topArtistsAllTime.slice(0, 10),
    recurringArtists
  };
}

async function main() {
  console.log('🎵 Music Taste Generator\n');

  // Scan for CSV files
  const csvFiles = scanForCSVs();
  if (csvFiles.length === 0) {
    console.error('Error: No CSV files found in data/ directory');
    console.error('Expected filename pattern: Your_Top_Songs_YYYY.csv');
    process.exit(1);
  }

  console.log(`Found ${csvFiles.length} CSV files:`);
  csvFiles.forEach(f => console.log(`  - ${f.filename} (${f.year})`));
  console.log('');

  // Process each year
  const years = [];
  const allArtistData = [];

  for (const csv of csvFiles) {
    console.log(`Processing ${csv.year}...`);
    const tracks = parseCSV(csv.path);
    const yearData = processYear(csv.year, tracks);
    years.push(yearData);

    // Store artist data for cross-year analysis
    allArtistData.push({
      year: csv.year,
      artistScores: processArtists(tracks, csv.year).artistScores
    });
  }

  // Calculate overview statistics
  const overview = calculateOverview(years, allArtistData);

  // Load and apply overrides
  const overrides = loadOverrides();
  const finalYears = applyOverrides(years, overrides);

  if (overrides) {
    console.log('\nApplied custom overrides from config/overrides.json');
  }

  // Build final output
  const output = {
    metadata: {
      totalTracks: overview.totalTracks,
      yearRange: overview.yearRange,
      yearsCount: overview.yearsCount,
      generatedAt: new Date().toISOString()
    },
    years: finalYears,
    overview,
    recurringArtists: overview.recurringArtists
  };

  // Write output
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`\n✅ Generated: ${OUTPUT_FILE}`);
  console.log(`   ${overview.totalTracks} tracks across ${overview.yearsCount} years`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
