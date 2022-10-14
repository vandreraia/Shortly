import { nanoid } from 'nanoid';
import { checkUrl, checkUser, insertUrl, selectUrlById, selectUrlByUrl, updateCounter } from '../repositories/urlRepository.js';

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

export async function getUrlById(req, res) {
    const { id } = req.params;
    try {
        const row = (await selectUrlById(id)).rows[0];

        if (!row) {
            return res.sendStatus(404);
        }

        return res.status(200).send(row);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const row = (await selectUrlByUrl(shortUrl)).rows[0];
        const url = row.url;
        await updateCounter(shortUrl, row.visit_count);
        if (!url) {
            return res.sendStatus(404);
        }

        return res.redirect(url)
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function deleteUrls(req, res) {
    const { id } = req.params;
    const { user } = res.locals
    console.log(id)
    try {
        const { rowCount } = await checkUser(id, user);
        const { rows } = await checkUrl(id);
        if (rows.length <= 0) {
            return res.sendStatus(404);
        }
        // console.log(user)
        await deleteUrls(id);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getRank(req, res) {
    
}