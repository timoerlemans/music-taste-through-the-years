import type { YearData } from '../../types';

interface YearCardProps {
  year: YearData;
  isActive: boolean;
}

export function YearCard({ year, isActive }: YearCardProps) {
  const glowStyle = {
    background: `radial-gradient(circle, ${year.color}15 0%, transparent 60%)`,
  };

  return (
    <article
      className={`year-card ${isActive ? 'active' : ''}`}
      data-year={year.year}
      style={{
        '--year-color': year.color,
        background: year.background,
      } as React.CSSProperties}
    >
      <div className="year-card-glow" style={glowStyle}></div>
      <div className="year-card-content">
        <div className="year-card-header">
          <span className="year-card-icon">{year.emoji}</span>
          <div>
            <div className="year-card-year">{year.year}</div>
            <div className="year-card-genre">{year.label}</div>
          </div>
        </div>

        <p className="year-card-mood">{year.mood}</p>

        <div className="year-card-subgenres">
          {year.subgenres.map((subgenre) => (
            <span key={subgenre} className="subgenre-tag">
              {subgenre}
            </span>
          ))}
        </div>

        <div className="year-card-artists">
          <h4>Top 10 Artists</h4>
          <div className="artists-grid">
            {year.topArtists.map((artist) => (
              <div key={`${artist.rank}-${artist.name}`} className="artist-item">
                <span
                  className={`artist-rank ${
                    artist.rank === 1
                      ? 'gold'
                      : artist.rank === 2
                      ? 'silver'
                      : artist.rank === 3
                      ? 'bronze'
                      : ''
                  }`}
                >
                  {artist.rank}
                </span>
                <div className="artist-info">
                  <p className="artist-name">{artist.name}</p>
                  <p className="artist-track">{artist.topTrack}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
