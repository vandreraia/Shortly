import connection from "../db/pgsql.js";

export async function insertUrl(email, url, shortUrl) {
    const id = (await connection.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )).rows[0].id;

    return connection.query(
        'INSERT INTO url (user_id, url, short_url) VALUES ($1, $2, $3)', [id, url, shortUrl]);
}

export async function selectUrlById(id) {
    console.log(id)
    return connection.query(`
        SELECT *
        FROM url
        WHERE id = $1
    `, [id]
    )
}