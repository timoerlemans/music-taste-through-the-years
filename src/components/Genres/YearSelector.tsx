import type { YearData } from '../../types';

interface YearSelectorProps {
  years: YearData[];
  selectedYear: number;
  onYearSelect: (year: number) => void;
}

export function YearSelector({ years, selectedYear, onYearSelect }: YearSelectorProps) {
  return (
    <div className="year-selector">
      {years.map((year) => (
        <button
          key={year.year}
          className={`year-btn ${year.year === selectedYear ? 'active' : ''}`}
          data-year={year.year}
          onClick={() => onYearSelect(year.year)}
        >
          {year.year}
        </button>
      ))}
    </div>
  );
}
