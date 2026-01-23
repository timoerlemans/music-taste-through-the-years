export interface AudioFeatures {
  danceability: number;
  energy: number;
  valence: number;
  acousticness: number;
  tempo: number;
  speechiness: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
}

export interface Genre {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface Artist {
  rank: number;
  name: string;
  topTrack: string;
  appearances: number;
  score: number;
}

export interface YearData {
  year: number;
  label: string;
  emoji: string;
  color: string;
  background: string;
  mood: string;
  trackCount: number;
  uniqueArtists: number;
  uniqueGenres: number;
  audioFeatures: AudioFeatures;
  topGenres: Genre[];
  subgenres: string[];
  topArtists: Artist[];
}

export interface RecurringArtist {
  name: string;
  years: number[];
  yearCount: number;
}

export interface TopArtistAllTime {
  rank: number;
  name: string;
  score: number;
  years: number[];
  yearCount: number;
}

export interface Overview {
  totalTracks: number;
  yearRange: string;
  yearsCount: number;
  loyalArtist: {
    name: string;
    score: number;
    years: number[];
  } | null;
  dominantPhase: {
    year: number;
    uniqueGenres: number;
  };
  topArtistsAllTime: TopArtistAllTime[];
  recurringArtists: RecurringArtist[];
}

export interface Metadata {
  totalTracks: number;
  yearRange: string;
  yearsCount: number;
  generatedAt: string;
}

export interface GeneratedData {
  metadata: Metadata;
  years: YearData[];
  overview: Overview;
  recurringArtists: RecurringArtist[];
}

export type TabId = 'timeline' | 'overview' | 'genres' | 'mood' | 'artists';
