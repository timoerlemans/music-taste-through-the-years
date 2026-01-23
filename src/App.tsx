import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { TimelineTab } from './components/Timeline/TimelineTab';
import { OverviewTab } from './components/Overview/OverviewTab';
import { GenresTab } from './components/Genres/GenresTab';
import { MoodTab } from './components/Mood/MoodTab';
import { ArtistsTab } from './components/Artists/ArtistsTab';
import { Footer } from './components/Footer';
import generatedData from './data/generated.json';
import type { GeneratedData, TabId } from './types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = generatedData as GeneratedData;

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('timeline');
  const [selectedYear, setSelectedYear] = useState<number>(
    data.years[data.years.length - 1].year
  );

  return (
    <>
      <Header
        yearRange={data.metadata.yearRange}
        yearsCount={data.metadata.yearsCount}
        totalTracks={data.metadata.totalTracks}
      />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'timeline' && (
        <TimelineTab
          years={data.years}
          selectedYear={selectedYear}
          onYearSelect={setSelectedYear}
        />
      )}

      {activeTab === 'overview' && (
        <OverviewTab years={data.years} overview={data.overview} />
      )}

      {activeTab === 'genres' && (
        <GenresTab
          years={data.years}
          selectedYear={selectedYear}
          onYearSelect={setSelectedYear}
        />
      )}

      {activeTab === 'mood' && <MoodTab years={data.years} />}

      {activeTab === 'artists' && (
        <ArtistsTab
          years={data.years}
          recurringArtists={data.recurringArtists}
          overview={data.overview}
        />
      )}

      <Footer
        totalTracks={data.metadata.totalTracks}
        yearRange={data.metadata.yearRange}
      />
    </>
  );
}

export default App;
