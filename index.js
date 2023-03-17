const http = require('http');
const url = require('url');
const filmController = require('./controller/film.controller');

const PORT = 4000;

const server = http.createServer(async (req, res) => {
    let urlParts = url.parse(req.url);
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const film = JSON.parse(Buffer.concat(buffers).toString());
    const id = Number(urlParts.pathname.slice(9));

    if (req.method == 'GET') {
        switch (urlParts.pathname) {
            case "/film": filmController.getFilms(res);
                break;

            case "/film/id/" + id:
                filmController.getOneFilm(id, res);
                break;

        }
    } else if (req.method == 'POST' && urlParts.pathname == "/film") {
        let newFilm = filmController.createFilm(film, id, res);

    } else if (req.method == 'DELETE' && urlParts.pathname == "/film/id/" + id) {
        filmController.deleteFilm(id, res);

    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Path not Found' }));
    }

})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log('listening port 4000');
});