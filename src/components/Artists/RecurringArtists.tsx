import type { YearData, RecurringArtist } from '../../types';

interface RecurringArtistsProps {
  years: YearData[];
  recurringArtists: RecurringArtist[];
}

export function RecurringArtists({ years, recurringArtists }: RecurringArtistsProps) {
  const allYears = years.map((y) => y.year);

  return (
    <div className="card">
      <h3>Recurring Artists (3+ years)</h3>
      <div className="recurring-artists-container">
        <div className="recurring-artists-header">
          <div className="artist-name-col"></div>
          <div className="years-row">
            {allYears.map((year) => (
              <span key={year}>{year.toString().slice(-2)}</span>
            ))}
          </div>
        </div>

        {recurringArtists.slice(0, 10).map((artist, index) => (
          <div
            key={artist.name}
            className={`recurring-artist-row ${index % 2 === 1 ? 'alt' : ''}`}
          >
            <div className="artist-name-col">{artist.name}</div>
            <div className="years-row">
              {allYears.map((year) => (
                <span
                  key={year}
                  className={`year-dot ${
                    artist.years.includes(year) ? 'active' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
