import type { YearData, Overview } from '../../types';
import { StatsGrid } from './StatsGrid';
import { DiversityChart } from './DiversityChart';
import { TopArtistsList } from './TopArtistsList';

interface OverviewTabProps {
  years: YearData[];
  overview: Overview;
}

export function OverviewTab({ years, overview }: OverviewTabProps) {
  return (
    <section id="overview" className="tab-content active">
      <StatsGrid overview={overview} years={years} />
      <DiversityChart years={years} />
      <TopArtistsList topArtists={overview.topArtistsAllTime} />
    </section>
  );
}
