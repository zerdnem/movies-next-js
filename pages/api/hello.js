import nc from "next-connect";
import cors from "cors";

const BASE_URL = "https://yts.torrentbay.to/";
const API_URL = `${BASE_URL}api/v2/list_movies.json`;

const handler = nc()
  .use(cors())
  .get(async (req, res) => {
    const { page } = req.query;
    const response = await fetch(`${API_URL}?page=${page}`);
    const data = await response.json();
    res.json(data);
  });

export default handler;

