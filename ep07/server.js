// ES module
import express from 'express';
import cors from 'cors';
import movies from './movie.json' assert { type: 'json' };

const app = express();
const port = 3000;
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello node!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/search', (req, res) => {
    console.log(req.query);
    const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(req.query.query.toLowerCase()));
    res.json(filteredMovies);
});
