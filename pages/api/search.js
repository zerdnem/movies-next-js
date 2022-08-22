import nc from "next-connect";
import cors from "cors";

const BASE_URL = 'https://yts.torrentbay.to/'
const API_URL = `${BASE_URL}api/v2/list_movies.json`

const handler = nc()
    .use(cors())
    .get(async (req, res) => {
        const { query } = req.query
        const response = await fetch(`${API_URL}?query_term=${query}`);
        const data = await response.json()
        res.json(data);
    });


export default handler