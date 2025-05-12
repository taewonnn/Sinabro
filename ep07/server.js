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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/search', (req, res) => {
    console.log(req.query);
    const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(req.query.query.toLowerCase()));
    res.json(filteredMovies);
});
