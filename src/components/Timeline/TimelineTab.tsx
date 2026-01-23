import type { YearData } from '../../types';
import { TimelineFlow } from './TimelineFlow';
import { YearCard } from './YearCard';

interface TimelineTabProps {
  years: YearData[];
  selectedYear: number;
  onYearSelect: (year: number) => void;
}

export function TimelineTab({ years, selectedYear, onYearSelect }: TimelineTabProps) {
  return (
    <section id="timeline" className="tab-content active">
      <TimelineFlow
        years={years}
        selectedYear={selectedYear}
        onYearSelect={onYearSelect}
      />

      {years.map((year) => (
        <YearCard
          key={year.year}
          year={year}
          isActive={year.year === selectedYear}
        />
      ))}
    </section>
  );
}
