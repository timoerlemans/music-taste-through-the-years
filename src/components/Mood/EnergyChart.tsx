import { Line } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import type { YearData } from '../../types';

interface EnergyChartProps {
  years: YearData[];
}

export function EnergyChart({ years }: EnergyChartProps) {
  const chartData = {
    labels: years.map((y) => y.year),
    datasets: [
      {
        label: 'Energy',
        data: years.map((y) => y.audioFeatures.energy),
        borderColor: '#ff4757',
        backgroundColor: '#ff4757',
        fill: false,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#ff4757',
      },
      {
        label: 'Acoustic',
        data: years.map((y) => y.audioFeatures.acousticness),
        borderColor: '#3742fa',
        backgroundColor: '#3742fa',
        fill: false,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#3742fa',
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
          label: (ctx) =>
            `${ctx.dataset.label}: ${Math.round((ctx.raw as number) * 100)}%`,
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
        max: 1,
        ticks: {
          color: '#666',
          callback: (value) => `${Math.round((value as number) * 100)}%`,
        },
      },
    },
  };

  // Find highest energy year
  const highestEnergy = years.reduce((max, y) =>
    y.audioFeatures.energy > max.audioFeatures.energy ? y : max
  );

  return (
    <div className="chart-card">
      <h3>Energy vs Acousticness</h3>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
      <p className="chart-note">
        🔥 {highestEnergy.year} has the highest energy (
        {Math.round(highestEnergy.audioFeatures.energy * 100)}%) with low
        acousticness ({Math.round(highestEnergy.audioFeatures.acousticness * 100)}%) —{' '}
        {highestEnergy.label.toLowerCase()} intensity
      </p>
    </div>
  );
}
