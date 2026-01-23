import type { YearData } from '../../types';
import { YearSelector } from './YearSelector';
import { GenreBars } from './GenreBars';
import { GenreJourney } from './GenreJourney';

interface GenresTabProps {
  years: YearData[];
  selectedYear: number;
  onYearSelect: (year: number) => void;
}

export function GenresTab({ years, selectedYear, onYearSelect }: GenresTabProps) {
  const selectedYearData = years.find((y) => y.year === selectedYear);

  return (
    <section id="genres" className="tab-content active">
      <div className="card">
        <h3>Genre Evolution by Year</h3>
        <YearSelector
          years={years}
          selectedYear={selectedYear}
          onYearSelect={onYearSelect}
        />
        {selectedYearData && <GenreBars year={selectedYearData} />}
      </div>
      <GenreJourney
        years={years}
        selectedYear={selectedYear}
        onYearSelect={onYearSelect}
      />
    </section>
  );
}
