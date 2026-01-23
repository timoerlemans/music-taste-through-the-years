import type { Overview, YearData } from '../../types';

interface StatsGridProps {
  overview: Overview;
  years: YearData[];
}

export function StatsGrid({ overview, years }: StatsGridProps) {
  const lastYear = years[years.length - 1];

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p className="stat-label">Most loyal artist</p>
        <p className="stat-value">{overview.loyalArtist?.name || 'N/A'}</p>
        <p className="stat-sub">
          {overview.loyalArtist
            ? `${overview.loyalArtist.years.length} of ${overview.yearsCount} years`
            : ''}
        </p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Most diverse year</p>
        <p className="stat-value">{overview.dominantPhase.year}</p>
        <p className="stat-sub">{overview.dominantPhase.uniqueGenres} unique genres</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Current phase</p>
        <p className="stat-value">{lastYear.year} - {lastYear.label}</p>
        <p className="stat-sub">{lastYear.topArtists[0]?.name}, {lastYear.topArtists[1]?.name}</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Total tracks analyzed</p>
        <p className="stat-value">{overview.totalTracks}</p>
        <p className="stat-sub">Across {overview.yearsCount} years</p>
      </div>
    </div>
  );
}
