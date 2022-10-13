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
        SELECT id, short_url AS "shortUrl", url
        FROM url
        WHERE id = $1
    `, [id]
    )
}

export async function selectUrlByUrl(shortUrl) {
    return connection.query(`
        SELECT *
        from url
        WHERE short_url = $1
    `, [shortUrl]
    )
}

export async function updateCounter(shortUrl, counter) {
    counter++;
    await connection.query(`
        UPDATE url
        SET visit_count = $1
        WHERE short_url = $2
    `, [counter, shortUrl]);
}

export async function checkUser(id, email) {
    return connection.query(`
        SELECT *
        FROM url
    `);
}

export async function checkUrl(id) {
    return connection.query(`
        SELECT *
        FROM url
        WHERE id = $1
    `, [id]);
}
export async function deleteUrl(id) {
    return connection.query(`
        DELETE FROM url
        WHERE id = $1
    ` [id]);
}