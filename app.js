// Spotify Dashboard - Minimal JavaScript

document.addEventListener('DOMContentLoaded', function() {
  initTabs();
  initYearSelection();
  initCharts();
});

// Tab Navigation
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      
      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update content
      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabId);
      });
    });
  });
}

// Year Selection (Timeline + Genres tab)
function initYearSelection() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const yearCards = document.querySelectorAll('.year-card');
  const yearBtns = document.querySelectorAll('.year-btn');
  const genreBars = document.querySelectorAll('.genre-bars');
  const journeyItems = document.querySelectorAll('.journey-item');
  
  function selectYear(year) {
    // Update timeline
    timelineItems.forEach(item => {
      item.classList.toggle('active', item.dataset.year === year);
    });
    
    // Update year cards
    yearCards.forEach(card => {
      card.classList.toggle('active', card.dataset.year === year);
    });
    
    // Update year buttons in genres tab
    yearBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.year === year);
    });
    
    // Update genre bars
    genreBars.forEach(bars => {
      bars.classList.toggle('active', bars.dataset.year === year);
    });
    
    // Update journey items
    journeyItems.forEach(item => {
      item.classList.toggle('active', item.dataset.year === year);
    });
  }
  
  // Timeline clicks
  timelineItems.forEach(item => {
    item.addEventListener('click', () => selectYear(item.dataset.year));
  });
  
  // Year button clicks
  yearBtns.forEach(btn => {
    btn.addEventListener('click', () => selectYear(btn.dataset.year));
  });
  
  // Journey item clicks
  journeyItems.forEach(item => {
    item.addEventListener('click', () => selectYear(item.dataset.year));
  });
}

// Chart.js Initialization
function initCharts() {
  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#888' }
      },
      tooltip: {
        backgroundColor: 'rgba(20, 20, 30, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        titleColor: '#fff',
        bodyColor: '#ccc'
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#666' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#666' }
      }
    }
  };

  // Diversity Chart
  const diversityCtx = document.getElementById('diversityChart');
  if (diversityCtx) {
    new Chart(diversityCtx, {
      type: 'line',
      data: {
        labels: diversity.map(d => d.year),
        datasets: [
          {
            label: 'Unique artists',
            data: diversity.map(d => d.uniqueArtists),
            borderColor: '#1DB954',
            backgroundColor: createGradient(diversityCtx, '#1DB954'),
            fill: true,
            tension: 0.4,
            borderWidth: 2
          },
          {
            label: 'Unique genres',
            data: diversity.map(d => d.uniqueGenres),
            borderColor: '#ff6b6b',
            backgroundColor: createGradient(diversityCtx, '#ff6b6b'),
            fill: true,
            tension: 0.4,
            borderWidth: 2
          }
        ]
      },
      options: chartDefaults
    });
  }

  // Valence Chart
  const valenceCtx = document.getElementById('valenceChart');
  if (valenceCtx) {
    new Chart(valenceCtx, {
      type: 'line',
      data: {
        labels: audioFeatures.map(d => d.year),
        datasets: [{
          label: 'Valence',
          data: audioFeatures.map(d => d.valence),
          borderColor: '#ffd700',
          backgroundColor: createGradient(valenceCtx, '#ffd700'),
          fill: true,
          tension: 0.4,
          borderWidth: 3
        }]
      },
      options: {
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          y: {
            ...chartDefaults.scales.y,
            min: 0,
            max: 0.7,
            ticks: {
              color: '#666',
              callback: value => `${Math.round(value * 100)}%`
            }
          }
        },
        plugins: {
          ...chartDefaults.plugins,
          tooltip: {
            ...chartDefaults.plugins.tooltip,
            callbacks: {
              label: ctx => `Valence: ${Math.round(ctx.raw * 100)}%`
            }
          }
        }
      }
    });
  }

  // Energy vs Acousticness Chart
  const energyCtx = document.getElementById('energyChart');
  if (energyCtx) {
    new Chart(energyCtx, {
      type: 'line',
      data: {
        labels: audioFeatures.map(d => d.year),
        datasets: [
          {
            label: 'Energy',
            data: audioFeatures.map(d => d.energy),
            borderColor: '#ff4757',
            backgroundColor: '#ff4757',
            fill: false,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#ff4757'
          },
          {
            label: 'Acoustic',
            data: audioFeatures.map(d => d.acousticness),
            borderColor: '#3742fa',
            backgroundColor: '#3742fa',
            fill: false,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#3742fa'
          }
        ]
      },
      options: {
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          y: {
            ...chartDefaults.scales.y,
            min: 0,
            max: 1,
            ticks: {
              color: '#666',
              callback: value => `${Math.round(value * 100)}%`
            }
          }
        },
        plugins: {
          ...chartDefaults.plugins,
          tooltip: {
            ...chartDefaults.plugins.tooltip,
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${Math.round(ctx.raw * 100)}%`
            }
          }
        }
      }
    });
  }
}

// Helper: Create gradient for charts
function createGradient(ctx, color) {
  const canvas = ctx.getContext ? ctx : ctx.canvas;
  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, 0, 280);
  gradient.addColorStop(0, color + '66'); // 40% opacity
  gradient.addColorStop(1, color + '00'); // 0% opacity
  return gradient;
}
