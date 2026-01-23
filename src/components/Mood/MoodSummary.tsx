import type { YearData } from '../../types';

interface MoodSummaryProps {
  years: YearData[];
}

export function MoodSummary({ years }: MoodSummaryProps) {
  return (
    <div className="card">
      <h3>Mood by Year</h3>
      <div className="mood-list">
        {years.map((year) => (
          <div key={year.year} className="mood-item">
            <span className="mood-year">{year.year}</span>
            <span className="mood-emoji">{year.emoji}</span>
            <span className="mood-text">{year.mood}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
