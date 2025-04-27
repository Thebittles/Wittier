
import Layout from '../components/Layout';
import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();

    setResults(data.organic_results || []);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 container">
        <h1 className="text-4xl font-bold mb-8">Google Search with SerpAPI</h1>
        <form onSubmit={handleSearch} className="flex gap-4 search-form holder">
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search something..."
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
            Search
          </button>
        </form>
        <div className="mt-8 w-full max-w-2xl news-container">
          {loading ? <p>Searching...</p> : results.map((result, idx) => (
            <div key={idx} className="border-b py-2 card article">
              <a className="text-blue-500 font-semibold" href={result.link} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
              <p>{result.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
