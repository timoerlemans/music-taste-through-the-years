interface HeaderProps {
  yearRange: string;
  yearsCount: number;
  totalTracks: number;
}

export function Header({ yearRange, yearsCount, totalTracks }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-glow"></div>
      <h1 className="header-title">Tim's Music Taste Through the Years</h1>
      <p className="header-subtitle">
        {yearRange} · {yearsCount} years · {totalTracks} tracks
      </p>
    </header>
  );
}
