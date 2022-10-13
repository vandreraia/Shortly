import connection from "../db/pgsql.js";

export async function insertUrl(email, url, shortUrl) {
    const { id } = await connection.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    console.log(id);
}