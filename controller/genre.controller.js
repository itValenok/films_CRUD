const db = require('../db');


class GenreController {
    async createGenre(id, film) {

        for (let i = 0; i < film["genre"].length; i++) {

            const newGenre = await db.query('INSERT INTO genre ("title", "film_id") VALUES ($1, $2) RETURNING *', [film["genre"][i], +id]);
        }

    }
    async getGenre(id) {
        const newGenre = await db.query('SELECT title FROM genre WHERE film_id = $1', [id]);
        return newGenre;
    }
    async deleteGenre(id) {
        const newGenre = await db.query('DELETE FROM genre WHERE film_id = $1', [id]);
    }
}

module.exports = new GenreController();