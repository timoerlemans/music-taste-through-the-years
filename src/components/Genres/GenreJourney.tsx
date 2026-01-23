import type { YearData } from '../../types';

interface GenreJourneyProps {
  years: YearData[];
  selectedYear: number;
  onYearSelect: (year: number) => void;
}

export function GenreJourney({ years, selectedYear, onYearSelect }: GenreJourneyProps) {
  return (
    <div className="card">
      <h3>The Genre Journey</h3>
      <div className="genre-journey">
        {years.map((year) => (
          <div
            key={year.year}
            className={`journey-item ${year.year === selectedYear ? 'active' : ''}`}
            data-year={year.year}
            onClick={() => onYearSelect(year.year)}
          >
            <span className="journey-emoji">{year.emoji}</span>
            <div className="journey-content">
              <div className="journey-header">
                <span className="journey-year">{year.year}</span>
                <span className="journey-genre">{year.label}</span>
              </div>
              <p className="journey-desc">
                {year.topGenres
                  .slice(0, 3)
                  .map((g) => g.name)
                  .join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
