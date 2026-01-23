import type { Overview } from '../../types';

interface ArtistInsightsProps {
  overview: Overview;
}

export function ArtistInsights({ overview }: ArtistInsightsProps) {
  // Find artists that only appear in one year but dominate it
  const oneYearWonders = overview.topArtistsAllTime
    .filter((a) => a.yearCount === 1 && a.score > 500)
    .slice(0, 2);

  // Find comeback artists (gap of 2+ years between appearances)
  const comebackArtists = overview.recurringArtists
    .filter((a) => {
      for (let i = 1; i < a.years.length; i++) {
        if (a.years[i] - a.years[i - 1] > 1) return true;
      }
      return false;
    })
    .slice(0, 2);

  return (
    <div className="insights-grid">
      <div className="insight-card">
        <h4 className="insight-title green">Constant Favorites</h4>
        <p className="insight-text">
          <strong>{overview.loyalArtist?.name}</strong> appears in{' '}
          {overview.loyalArtist?.years.length} of {overview.yearsCount} years —
          a consistent thread through your taste evolution.
        </p>
      </div>
      <div className="insight-card">
        <h4 className="insight-title red">One-Year Wonders</h4>
        <p className="insight-text">
          {oneYearWonders.length > 0 ? (
            <>
              <strong>{oneYearWonders.map((a) => a.name).join(' & ')}</strong>{' '}
              dominated a single year then faded from the top.
            </>
          ) : (
            'Artists who dominated one year then disappeared.'
          )}
        </p>
      </div>
      <div className="insight-card">
        <h4 className="insight-title gold">Comeback Artists</h4>
        <p className="insight-text">
          {comebackArtists.length > 0 ? (
            <>
              <strong>{comebackArtists.map((a) => a.name).join(' & ')}</strong>{' '}
              disappeared and returned — music that stays with you.
            </>
          ) : (
            'Artists who return after a gap — lasting impact.'
          )}
        </p>
      </div>
    </div>
  );
}
