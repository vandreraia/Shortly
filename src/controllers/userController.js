import connection from '../db/pgsql.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { searchUser, insertClient } from '../repositories/userReposity.js';

export async function getUsers(req, res) {
    const { email } = req.query;
    try {
        const params = [];
        let whereClause = '';

        if (email) {
            params.push(`${email}%`);
            whereClause += `WHERE email ILIKE $${params.length}`;
        }

        const { rows: users } = await connection.query(
            `
    SELECT * FROM users
    ${whereClause}
  `,
            params
        );

        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        resizeBy.sendStatus(500);
    }
}

export async function getUser(req, res) {
    const { email, password } = req.body;
    const { logeduser } = res.locals;

    try {

        const secretKey = process.env.JWT_SECRET

        const token = jwt.sign(logeduser, secretKey)

        const { rows: user, rowCount } = await connection.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (rowCount === 0) {
            return res.sendStatus(401);
        }

        const compare = bcrypt.compareSync(password, user[0].password)

        if (!compare) {
            return res.sendStatus(401);
        }
        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        resizeBy.sendStatus(500);
    }
}

export async function createUser(req, res) {
    const { name, email, password } = req.body;

    try {
        const { rowCount } = await searchUser(email);

        if (rowCount > 0) {
            return res.sendStatus(409);
        }

        await insertClient(name, email, password);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        resizeBy.sendStatus(500);
    }
}