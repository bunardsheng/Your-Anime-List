export default function getAnime(req, res) {
    try {
        const response = await anime.getAnimes();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export function insertAnime(req, res) {
    try {
        const response = await anime.insertAnime(req);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
}


