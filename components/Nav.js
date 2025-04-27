import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
          <Link href="/news">Live News</Link>
          <Link href="/emergency">Emergency</Link>
          <Link href="/domestic-violence">Safety and Support Services</Link>
          <Link href="/family-programs">Family Programs</Link>
          <Link href="/mentalhealth">Mental Health</Link>
          <Link href="/senior-disabled-citizen-resources">Senior and Disabled Services</Link>
          <Link href="/traffic">Traffic</Link>
          <Link href="/weather">Weather</Link>
          <Link href="/search">Search</Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-links">
          <Link href="/">Home</Link>
          <Link href="/news">Live News</Link>
          <Link href="/emergency">Emergency</Link>
          <Link href="/domestic-violence">Safety and Support Services</Link>
          <Link href="/family-programs">Family Programs</Link>
          <Link href="/mentalhealth">Mental Health</Link>
          <Link href="/senior-disabled-citizens-resources">Senior and Disabled Services</Link>
          <Link href="/traffic">Traffic</Link>
          <Link href="/weather">Weather</Link>
          <Link href="/search">Search</Link>
        </div>
      )}

      <div className="navbar-two">
        <Image
          src="/images/OOI_Logo_color.png"
          alt="Logo"
          width={70}
          height={70}
        />

        <Link 
          href="https://austintexas.gov"
          className="atx-link"
        >austintexas.gov</Link>
      </div>
    </>
  );
}