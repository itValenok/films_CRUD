const db = require('../db');
const { createGenre, getGenre, deleteGenre } = require('./genre.controller');

class FilmController {
    async createFilm(film, id, res) {
        const newFilm = await db.query('INSERT INTO film ("title", "yearProduction") VALUES ($1, $2) RETURNING *', [film.title, film.yearProduction]);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        createGenre(newFilm.rows[0]['id'], film);
        newFilm.rows[0]["genre"] = film["genre"];
        res.end(JSON.stringify(newFilm.rows[0]));
    }
    async getFilms(res) {
        const newFilm = await db.query('SELECT * FROM film');


        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newFilm.rows));
    }
    async getOneFilm(id, res) {
        const newFilm = await db.query('SELECT * FROM film WHERE id = $1', [id]);
        if (newFilm.rows[0] == null) {
            res.end('Такого фильма нет.');
        } else {
            let genre = await getGenre(id);
            newFilm.rows[0]["genre"] = genre.rows[0];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newFilm.rows[0]));
        }
    }
    async deleteFilm(id, res) {
        deleteGenre(id);
        const newFilm = await db.query('DELETE FROM film WHERE id = $1', [id]);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('Фильм удален!');

    }
}

module.exports = new FilmController();
//export default new FilmController()