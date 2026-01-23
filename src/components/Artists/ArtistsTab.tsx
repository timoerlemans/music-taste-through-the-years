import type { YearData, RecurringArtist, Overview } from '../../types';
import { RecurringArtists } from './RecurringArtists';
import { ArtistInsights } from './ArtistInsights';

interface ArtistsTabProps {
  years: YearData[];
  recurringArtists: RecurringArtist[];
  overview: Overview;
}

export function ArtistsTab({ years, recurringArtists, overview }: ArtistsTabProps) {
  return (
    <section id="artists" className="tab-content active">
      <RecurringArtists years={years} recurringArtists={recurringArtists} />
      <ArtistInsights overview={overview} />
    </section>
  );
}
