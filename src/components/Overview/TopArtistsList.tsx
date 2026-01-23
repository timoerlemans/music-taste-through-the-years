import type { TopArtistAllTime } from '../../types';

interface TopArtistsListProps {
  topArtists: TopArtistAllTime[];
}

export function TopArtistsList({ topArtists }: TopArtistsListProps) {
  const maxScore = topArtists[0]?.score || 1;

  return (
    <div className="card">
      <h3>Top 10 Artists (weighted score)</h3>
      <div className="top-artists-list">
        {topArtists.slice(0, 10).map((artist) => (
          <div key={artist.name} className="top-artist-row">
            <span className={`top-artist-rank ${artist.rank <= 3 ? 'top-3' : ''}`}>
              {artist.rank}
            </span>
            <span className="top-artist-name">{artist.name}</span>
            <div
              className="top-artist-bar"
              style={{ width: `${(artist.score / maxScore) * 100}%` }}
            />
            <span className="top-artist-appearances">
              {artist.yearCount}× in list
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
