'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import SendTextForm from "../components/SendTextForm";

// Dynamically load TrafficMap (with SSR disabled)
const TrafficMap = dynamic(() => import("../components/TrafficMap"), {
  loading: () => <p>Loading map...</p>,
  ssr: false,
});

// Tags for CapMetro topics
const tags = [
  "CapMetro",
  "Public Transportation",
  "Bus Routes",
  "Park and Ride",
  "Transit Safety",
  "Traffic Updates",
  "Street Closures",
  "Detours",
];

export default function NewsPage() {
  const [selectedTag, setSelectedTag] = useState("CapMetro");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [smsMessage, setSmsMessage] = useState('');


  useEffect(() => {
    async function fetchGoogleSearchLightResults() {
      setLoading(true);
      try {
        const tagQuery = selectedTag !== "All" ? `?tag=${selectedTag}` : "";
        const res = await fetch(`/api/googleLightSearch${tagQuery}`);
        const data = await res.json();
        setArticles(data.articles);
    
        // ✨ Build SMS text from articles
        const smsText = data.articles.map(article => (
          `• ${article.title}: ${article.link}`
        )).join('\n');
    
        setSmsMessage(`🚌 CapMetro & Traffic Updates - ${selectedTag}:\n${smsText}`);
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
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">
        Traffic: 
          CapMetro Information & Closures
        </h1>
        <SendTextForm messageToSend={smsMessage} />

        {/* Tag Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 search-form">
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

        {/* News Articles */}
        {loading ? (
          <p>Loading articles...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 news-container">
            {articles.slice(0, 6).map((article, idx) => (
              <div
                key={idx}
                className="card article border p-4 rounded-xl shadow hover:shadow-lg transition"
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

      {/* Traffic Map Section */}
      <div className="p-6 callout">
        <div className="inset">
          <div className="map-container" style={{ height: "600px" }}>
            <TrafficMap />
          </div>
        </div>  
      </div>
    </Layout>
  );
}
