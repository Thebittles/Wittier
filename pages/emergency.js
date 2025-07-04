'use client';
import Layout from '../components/Layout';
import SendTextForm from '../components/SendTextForm';
import { useState, useEffect } from 'react';

const tags = [
  'CPR', 
  'Heimlich', 
  'First Aid', 
  'Treating bullet wounds',
  'Choking', 
  'Heart Attack Response', 
  'Stroke Recognition', 
  'Burn Treatment', 
  'Severe Bleeding Control', 
  'Fracture Stabilization', 
  'Allergic Reaction Response', 
  'Seizure First Aid', 
  'Drowning Rescue', 
  'Shock Treatment', 
  'Basic Life Support (BLS)', 
  'AED Usage', 
  'Emergency Childbirth',
  'Poisoning Response',
  'Hypothermia Treatment',
  'Heatstroke Response'
];

export default function EmergencyVideosPage() {
  const [selectedTag, setSelectedTag] = useState('CPR');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [smsMessage, setSmsMessage] = useState('');


  function extractVideoId(url) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  }


  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const tagQuery = selectedTag !== 'All' ? `?tag=${selectedTag}` : '';
        const res = await fetch(`/api/emergencyVideo${tagQuery}`);
        const data = await res.json();
        setVideos(data.videos);
    
        // ✨ Build SMS text from videos
        const smsText = data.videos.map(video => (
          `• ${video.title}: ${video.link}`
        )).join('\n');
    
        setSmsMessage(`🚑 Emergency Videos - ${selectedTag}:\n${smsText}`);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [selectedTag]);

  return (
    <Layout>
    <div className="p-6 container">
      <h1 className="text-2xl font-bold mb-4">Emergency Videos</h1>
      <div className="holder">
      <SendTextForm messageToSend={smsMessage} />
      </div>

      <div className="flex gap-2 mb-6 buttons">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 videos-container">
          {videos.map(video => (
            <div key={video.id} className="border rounded p-4 video">
              <iframe
                src={`https://www.youtube.com/embed/${extractVideoId(video.link)}`}
                title={video.title}
                className="w-full h-64 rounded"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy" 
              ></iframe>
            </div>
          ))}
        </div>
      )}

    </div>
    </Layout>
  );
}
