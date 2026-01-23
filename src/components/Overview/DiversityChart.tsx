import { Line } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import type { YearData } from '../../types';

interface DiversityChartProps {
  years: YearData[];
}

export function DiversityChart({ years }: DiversityChartProps) {
  const chartData = {
    labels: years.map((y) => y.year),
    datasets: [
      {
        label: 'Unique artists',
        data: years.map((y) => y.uniqueArtists),
        borderColor: '#1DB954',
        backgroundColor: '#1DB95466',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Unique genres',
        data: years.map((y) => y.uniqueGenres),
        borderColor: '#ff6b6b',
        backgroundColor: '#ff6b6b66',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#888' },
      },
      tooltip: {
        backgroundColor: 'rgba(20, 20, 30, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#ccc',
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#666' },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#666' },
      },
    },
  };

  // Find the year with lowest diversity for the note
  const lowestDiversity = years.reduce((min, y) =>
    y.uniqueArtists < min.uniqueArtists ? y : min
  );

  return (
    <div className="chart-card">
      <h3>Diversity Over Time</h3>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
      <p className="chart-note">
        📉 {lowestDiversity.year} shows the most focused taste: only{' '}
        {lowestDiversity.uniqueArtists} artists and {lowestDiversity.uniqueGenres}{' '}
        genres — {lowestDiversity.label.toLowerCase()} dominates
      </p>
    </div>
  );
}
