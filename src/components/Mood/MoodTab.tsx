import type { YearData } from '../../types';
import { ValenceChart } from './ValenceChart';
import { EnergyChart } from './EnergyChart';

interface MoodTabProps {
  years: YearData[];
}

export function MoodTab({ years }: MoodTabProps) {
  return (
    <section id="mood" className="tab-content active">
      <ValenceChart years={years} />
      <EnergyChart years={years} />
    </section>
  );
}
