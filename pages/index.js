
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const webai = new WebAI({ apiKey: process.env.NEXT_PUBLIC_WEBAI_API_KEY });
    const completion = await webai.generateText({
      model: 'gpt-4-turbo',
      prompt: prompt,
      maxTokens: 500,
    });

    setOutput(completion.text);
    setLoading(false);
  };

  return (
    <Layout>
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">WebAI Text Generator</h1>
      <form onSubmit={handleSubmit} className="flex gap-4 search-form">
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Submit
        </button>
      </form>
      <div className="mt-8">
        {loading ? <p>Thinking...</p> : <p>{output}</p>}
      </div>
    </div>
    </Layout>
  );
}



