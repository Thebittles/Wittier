
import { GoogleSearch } from 'google-search-results-nodejs';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const search = new GoogleSearch(process.env.SERP_API_KEY);

  const query = req.query.q || "Next.js tutorials";

  search.json({ q: query, location: "Austin,Texas" }, (data) => {
    res.status(200).json(data);
  });
}
