// pages/api/videos.js

export default async function handler(req, res) {
  const { tag } = req.query;

  if (!tag) {
    return res.status(400).json({ error: "Tag is required" });
  }

  try {
    const searchQuery = encodeURIComponent(tag);
    const apiKey = process.env.SERP_API_KEY;

    const serpApiUrl = `https://serpapi.com/search.json?engine=youtube&search_query=${searchQuery}&api_key=${apiKey}`;
    const response = await fetch(serpApiUrl);

    const data = await response.json();

    console.log("Hello", data);

    const videos =
      data.video_results?.map((video) => ({
        id: video.position, // or video.title if you prefer
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        link: video.link,
      })) || [];

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching from SerpAPI:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
