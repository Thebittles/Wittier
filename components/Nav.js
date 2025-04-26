import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <h3>City of Austin Community Resource Dashboard</h3>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className="desktop-links">
          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-links">
          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
        </div>
      )}
    </>
  );
}