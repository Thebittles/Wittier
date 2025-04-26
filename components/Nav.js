import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">WebAI Project</div>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>
      </div>
    </nav>
  );
}