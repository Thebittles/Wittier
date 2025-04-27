"use client";
import Layout from '../components/Layout';
import { useState, useEffect } from "react";

const tags = ["Weather"];

export default function NewsPage() {
  const [selectedTag, setSelectedTag] = useState("Weather");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGoogleSearchLightResults() {
      setLoading(true);
      try {
        const tagQuery = selectedTag !== "All" ? `?tag=${selectedTag}` : "";
        const res = await fetch(`/api/googleLightSearch${tagQuery}`);
        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGoogleSearchLightResults();
  }, [selectedTag]);

  return (
    <Layout>
    <div className="p-6 container">
      <h1 className="text-2xl font-bold mb-4">Weather</h1>

      <div className="flex gap-2 mb-6 search-form">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full border ${
              selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 news-container">
          {articles.slice(0, 6).map((article, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-xl shadow hover:shadow-lg transition card article"
            >
              <div className="flex items-center gap-2 mb-2">
                {article.favicon && (
                  <img
                    src={article.favicon}
                    alt="favicon"
                    className="w-6 h-6 object-contain"
                  />
                )}
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {article.title}
                </a>
              </div>

              {/* Display thumbnail if available */}
              {article.thumbnail && (
                <img
                  src={article.thumbnail}
                  alt="thumbnail"
                  className="w-full h-48 object-cover mb-3 rounded-lg"
                />
              )}

              <p className="text-gray-600 text-sm">{article.snippet}</p>
              <p className="text-gray-400 text-xs mt-2">{article.source}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </Layout>
  );
}
