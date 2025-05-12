// ES module
import express from 'express';
import cors from 'cors';
import movies from './movie.json' assert { type: 'json' };
import fs from 'fs';
import { getInitialHTML } from './dist/index.js';
const app = express();
const port = 3000;

// cors
app.use(cors());
// static 파일 서빙
app.use(express.static('dist'));

app.get('/', (req, res) => {
    fs.readFile('index.html', (err, file) => {
        res.send(file.toString().replace('<!--app-->', getInitialHTML['/']));
    });
});

const getFilteredMovies = (query) => {
    return movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
};

app.get('/search', (req, res) => {
    const filteredMovies = getFilteredMovies(req.query.query);
    const initialData = {
        movies: filteredMovies,
    };
    fs.readFile('index.html', (err, file) => {
        res.send(
            file.toString().replace(
                '<!--app-->',
                `<script>
        window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}
        </script>` + getInitialHTML['/search'](initialData)
            )
        );
    });
});

app.get('/api/search', (req, res) => {
    res.json(getFilteredMovies(req.query.query));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
