

export default async function handler(req, res) {
  const { tag } = req.query;

  try {
    const searchQuery = encodeURIComponent(tag || 'domestic violence resources Austin Texas');
    const apiKey = process.env.SERP_API_KEY;

    const serpApiUrl = `https://serpapi.com/search.json?q=${searchQuery}&location=Austin,Texas,United States&google_domain=google.com&hl=en&gl=us&api_key=${apiKey}`;
    
    const response = await fetch(serpApiUrl);
    const data = await response.json();

    // Limit to 6 resources
    const resources = (data.organic_results || []).slice(0, 6).map(result => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet,
      displayed_link: result.displayed_link
    }));

    res.status(200).json({ resources });
  } catch (error) {
    console.error('Error fetching domestic violence resources:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
}
