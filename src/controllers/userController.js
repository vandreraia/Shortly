import connection from '../db/pgsql.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { searchUser, insertClient, searchUrl, countUrl } from '../repositories/userReposity.js';

export async function getUsers(req, res) {
    const { user } = res.locals;

    try {
        const userInfo = (await searchUser(user)).rows[0];
        if (!userInfo) {
            return sendStatus(404);
        }
        const urls = (await searchUrl(userInfo.id)).rows;

        let count = (await countUrl(userInfo.id)).rows[0].sum;

        const me = {
            id: userInfo.id,
            name: userInfo.name,
            visitCount: count,
            shortenedUrls: urls
        }
        res.status(200).send(me);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUser(req, res) {
    const { email, password } = req.body;

    try {
        const secretKey = process.env.JWT_SECRET

        const { rows: user, rowCount } = await searchUser(email);

        if (rowCount === 0) {
            return res.sendStatus(401);
        }

        // res.locals.user = user[0];
        const token = jwt.sign(user[0].email, secretKey)
        const compare = bcrypt.compareSync(password, user[0].password)

        if (!compare) {
            return res.sendStatus(401);
        }

        const obj = { token: token }
        return res.status(200).send(obj);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function createUser(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.sendStatus(422);
        }
        const { rowCount } = await searchUser(email);

        if (rowCount > 0) {
            return res.sendStatus(409);
        }

        await insertClient(name, email, password);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}