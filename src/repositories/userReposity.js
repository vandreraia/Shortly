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

export async function searchUrl(id) {
    return connection.query(
        'SELECT id, short_url AS "shortUrl", url, visit_count AS "visitCount" FROM url WHERE user_id = $1', [id]
    );
}
export async function countUrl(id) {
    return connection.query(
        'SELECT SUM(visit_count) FROM url WHERE user_id = $1', [id]
    );
}