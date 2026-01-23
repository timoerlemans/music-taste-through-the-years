import { Line } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import type { YearData } from '../../types';

interface ValenceChartProps {
  years: YearData[];
}

export function ValenceChart({ years }: ValenceChartProps) {
  const chartData = {
    labels: years.map((y) => y.year),
    datasets: [
      {
        label: 'Valence',
        data: years.map((y) => y.audioFeatures.valence),
        borderColor: '#ffd700',
        backgroundColor: '#ffd70066',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
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
        callbacks: {
          label: (ctx) => `Valence: ${Math.round((ctx.raw as number) * 100)}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#666' },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        min: 0,
        max: 0.7,
        ticks: {
          color: '#666',
          callback: (value) => `${Math.round((value as number) * 100)}%`,
        },
      },
    },
  };

  // Find lowest and highest valence years
  const lowestValence = years.reduce((min, y) =>
    y.audioFeatures.valence < min.audioFeatures.valence ? y : min
  );
  const highestValence = years.reduce((max, y) =>
    y.audioFeatures.valence > max.audioFeatures.valence ? y : max
  );

  return (
    <div className="chart-card">
      <h3>Mood Through the Years (Valence = positivity)</h3>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
      <div className="mood-summary">
        <div className="mood-stat low">
          <p className="mood-years">{lowestValence.year}</p>
          <p className="mood-label">
            Lowest valence (~{Math.round(lowestValence.audioFeatures.valence * 100)}%)
          </p>
          <p className="mood-desc">Darker, more intense music</p>
        </div>
        <div className="mood-stat high">
          <p className="mood-years">{highestValence.year}</p>
          <p className="mood-label">
            Highest valence (~{Math.round(highestValence.audioFeatures.valence * 100)}%)
          </p>
          <p className="mood-desc">More uplifting music</p>
        </div>
      </div>
    </div>
  );
}
