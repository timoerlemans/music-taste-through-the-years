# Music Taste Through the Years

A React dashboard that visualizes your Spotify listening history across multiple years. Built with Vite, TypeScript, React, and Chart.js.

## Features

- **Timeline View**: See your music evolution year by year with auto-generated labels, emojis, and mood descriptions
- **Overview**: Statistics, diversity charts, and top artists all-time
- **Genres**: Genre distribution per year with interactive selection
- **Mood**: Valence and energy charts showing your emotional music journey
- **Artists**: Recurring artists visualization and insights

## Quick Start

```bash
# Install dependencies
pnpm install

# Add your Spotify CSV exports to data/
# Files should be named: Your_Top_Songs_YYYY.csv

# Generate data and start dev server
pnpm run generate
pnpm dev
```

## Workflow

1. **Export your Spotify data**: Get your "Top Songs" playlists as CSV files
2. **Place CSVs in `data/`**: Use naming pattern `Your_Top_Songs_YYYY.csv`
3. **Run generator**: `pnpm run generate` processes CSVs into JSON
4. **Develop**: `pnpm dev` starts the development server
5. **Build**: `pnpm build` creates production bundle (auto-runs generator)

## CSV Format

The generator expects CSV files with these columns from Spotify exports:
- Track URI, Track Name, Album Name, Artist Name(s)
- Genres (comma-separated)
- Audio features: Danceability, Energy, Valence, Acousticness, Tempo, etc.

## Customization

### Override Auto-Generated Labels

Create `config/overrides.json` to customize year labels, emojis, or moods:

```json
{
  "years": {
    "2022": {
      "label": "Nederpop",
      "emoji": "🇳🇱",
      "mood": "Political · Fun · Dutch Language"
    }
  }
}
```

### Genre/Color Mappings

Edit `generator/config/color-map.js` and `generator/config/emoji-map.js` to customize how genres are visualized.

## Project Structure

```
├── data/                    # Your CSV files (gitignored)
├── generator/               # CSV processing script
│   ├── index.js            # Main orchestrator
│   ├── processors/         # Data processors
│   └── config/             # Mapping configs
├── config/
│   └── overrides.json      # Optional customizations
├── src/
│   ├── components/         # React components
│   ├── data/
│   │   └── generated.json  # Generated data
│   ├── types.ts            # TypeScript types
│   └── App.tsx             # Main app
└── dist/                   # Production build
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Generate data and build for production
- `pnpm preview` - Preview production build
- `pnpm generate` - Run the CSV generator only

## Tech Stack

- **Vite** - Build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Chart.js / react-chartjs-2** - Charts
- **PapaParse** - CSV parsing
