export default async function handler(req, res) {
  const { tag } = req.query;

  if (!tag) {
    return res.status(400).json({ error: "Tag is required" });
  }

  try {
    const apiKey = process.env.SERP_API_KEY;
    const searchQuery = encodeURIComponent(tag);
    const serpApiUrl = `https://serpapi.com/search?engine=google_light&q=${searchQuery}&location=Austin,+Texas,+United+States&hl=en&gl=us&api_key=${apiKey}`;
    const response = await fetch(serpApiUrl);

    const data = await response.json();

    console.log("Hello", data);

    // NEW: map over organic_results and include thumbnail if available
    const articles =
      data.organic_results?.map((result) => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet,
        favicon: result.favicon,
      })) || [];

    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error fetching from SerpAPI:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}