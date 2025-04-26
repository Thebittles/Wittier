'use client';
import Layout from '../components/Layout';
import SendTextForm from '../components/SendTextForm';

import { useState, useEffect } from 'react';

const tags = ['All', 'Shelters', 'Hotlines', 'Support Groups'];

export default function DomesticViolenceResourcesPage() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const sheltersInfo = `
  🏠 Austin Shelter Resources:
  - SAFE Alliance: (512) 267-7233
  - Salvation Army: (512) 476-1111
  - Caritas of Austin: (512) 479-4610
  `;



  useEffect(() => {
    async function fetchResources() {
      setLoading(true);
      try {
        const tagQuery = selectedTag !== 'All' ? `?tag=${selectedTag} domestic violence` : '';
        const res = await fetch(`/api/domesticViolenceResources${tagQuery}`);
        const data = await res.json();
        setResources(data.resources);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setLoading(false);
      }
    }


    fetchResources();
  }, [selectedTag]);

  return (
    <Layout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Domestic Violence Resources</h1>
        <SendTextForm messageToSend={sheltersInfo} />
      <div className="flex gap-2 mb-6">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full border ${selectedTag === tag ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <div key={index} className="border rounded p-4">
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                <h2 className="text-lg font-semibold text-purple-700 hover:underline">{resource.title}</h2>
              </a>
              <p className="text-sm text-gray-600">{resource.snippet}</p>
              <p className="text-xs text-gray-400">{resource.displayed_link}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </Layout>
  );
}
