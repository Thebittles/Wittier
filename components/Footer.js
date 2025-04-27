import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <footer className="w-full bg-[#1e1e1e] text-white py-6">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 flex flex-row justify-between items-center text-left">

        {/* Left: Logo */}
        <div className="flex-shrink-0 logo">
          <Image 
            src="/images/OOI_Logo_color.png" 
            alt="City of Austin Logo" 
            width={80} 
            height={80} 
          />
        </div>

        {/* Center: Links */}
        <div className="flex flex-row items-center space-x-8 text-sm footer-links">
          <Link href="/help" className="hover:underline hover:text-blue-300 transition duration-200">Help</Link>
          <Link href="/sitemap" className="hover:underline hover:text-blue-300 transition duration-200">Site Map</Link>
          <Link href="/about" className="hover:underline hover:text-blue-300 transition duration-200">About Us</Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-4 footer-links">
          <a href="#" aria-label="Facebook" className="hover:opacity-75">
            <Image src="/images/facebook-icon.png" alt="Facebook" width={32} height={32} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:opacity-75">
            <Image src="/images/linkedin-icon.png" alt="LinkedIn" width={32} height={32} />
          </a>
          <a href="#" aria-label="Twitter/X" className="hover:opacity-75">
            <Image src="/images/x-icon.png" alt="Twitter/X" width={32} height={32} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:opacity-75">
            <Image src="/images/youtube-icon.png" alt="YouTube" width={32} height={32} />
          </a>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="text-center text-xs text-gray-400 mt-6">
        © 2025 City of Austin. All rights reserved.
      </div>

    </footer>
  );
}