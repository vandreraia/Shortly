import connection from "../db/pgsql.js";
import bcrypt from 'bcrypt';

export async function searchUser(email) {
    return connection.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
}

export async function insertClient(name, email, password) {
    const cryptoPassword = bcrypt.hashSync(password, 10);

    return connection.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [name, email, cryptoPassword]
    );
}