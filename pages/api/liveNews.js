export default async function handler(req, res) {
  const { tag } = req.query;

  if (!tag) {
    return res.status(400).json({ error: "Tag is required" });
  }

  try {
    const apiKey = process.env.SERP_API_KEY;
    const searchQuery = encodeURIComponent(tag);
    const serpApiUrl = `https://serpapi.com/search.json?q=${searchQuery}&location=Austin,+Texas,+United+States&hl=en&gl=us&api_key=${apiKey}`;
    const response = await fetch(serpApiUrl);

    const data = await response.json();

    // NEW: map over organic_results and include thumbnail if available
    const articles =
      data.organic_results?.map((result) => ({
        title: result.title,
        link: result.link,
        source: result.source,
        snippet: result.snippet,
        favicon: result.favicon,
        thumbnail: result.thumbnail, // Include the thumbnail if available
      })) || [];

    // Limit to top 6 articles
    const top6Articles = articles.slice(0, 6);

    res.status(200).json({ articles: top6Articles });
  } catch (error) {
    console.error("Error fetching from SerpAPI:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
