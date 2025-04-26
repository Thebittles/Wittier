'use client';

import { useState, useEffect } from 'react';

const tags = ['All', 'CPR', 'Heimlich', 'First Aid', 'Choking'];

export default function EmergencyVideosPage() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const tagQuery = selectedTag !== 'All' ? `?tag=${selectedTag}` : '';
        const res = await fetch(`/api/emergencyVideo${tagQuery}`);
        const data = await res.json();
        setVideos(data.videos);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [selectedTag]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Emergency Videos</h1>
      
      <div className="flex gap-2 mb-6">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full border ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map(video => (
            <div key={video.id} className="border rounded p-4">
              <a href={video.link} target="_blank" rel="noopener noreferrer">
                <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover mb-2" />
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <p className="text-sm text-gray-600">{video.description}</p>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
