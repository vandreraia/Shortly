import connection from '../db/pgsql.js';
import { nanoid } from 'nanoid';
import { insertUrl } from '../repositories/urlRepository.js';

export async function shortenUrl(req, res) {
    const { user } = res.locals
    const { url } = req.body;
    try {
        const shortUrl = nanoid();

        await insertUrl(user, url, shortUrl);

        return res.status(201).send({ shortUrl: shortUrl });
    } catch (error) {
        console.log(error.message)
        return res.sendStatus(500);
    }
}