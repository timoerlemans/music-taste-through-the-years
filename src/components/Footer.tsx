interface FooterProps {
  totalTracks: number;
  yearRange: string;
}

export function Footer({ totalTracks, yearRange }: FooterProps) {
  return (
    <footer className="footer">
      <p>
        Based on {totalTracks} tracks from your Spotify "Wrapped" playlists (
        {yearRange})
      </p>
      <p>
        Position in list = listening frequency · Top 10 weighs more than
        position 51-100
      </p>
    </footer>
  );
}
