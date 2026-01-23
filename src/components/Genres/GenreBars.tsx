import type { YearData } from '../../types';

interface GenreBarsProps {
  year: YearData;
}

export function GenreBars({ year }: GenreBarsProps) {
  return (
    <div className="genre-bars-container">
      <div className="genre-bars active">
        <h4>{year.year}: Top 5 Genres</h4>
        {year.topGenres.map((genre) => (
          <div key={genre.name} className="genre-bar-item">
            <span className="genre-name">{genre.name}</span>
            <span className="genre-pct">{genre.percentage}%</span>
            <div className="genre-bar-track">
              <div
                className="genre-bar-fill"
                style={{
                  width: `${genre.percentage}%`,
                  background: `linear-gradient(90deg, ${genre.color}, ${genre.color}88)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
