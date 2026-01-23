import type { YearData } from '../../types';

interface TimelineFlowProps {
  years: YearData[];
  selectedYear: number;
  onYearSelect: (year: number) => void;
}

export function TimelineFlow({ years, selectedYear, onYearSelect }: TimelineFlowProps) {
  return (
    <div className="timeline-flow">
      {years.map((year, index) => (
        <div key={year.year}>
          <div
            className={`timeline-item ${year.year === selectedYear ? 'active' : ''}`}
            data-year={year.year}
            onClick={() => onYearSelect(year.year)}
          >
            <div
              className="timeline-circle"
              style={{
                '--genre-color': year.color,
                background: year.background,
              } as React.CSSProperties}
            >
              {year.emoji}
            </div>
            <span className="timeline-year" style={{ color: year.color }}>
              {year.year}
            </span>
            <span className="timeline-genre">{year.label}</span>
          </div>

          {index < years.length - 1 && (
            <div
              className="timeline-connector"
              style={{
                background: `linear-gradient(90deg, ${year.color}, ${years[index + 1].color})`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
