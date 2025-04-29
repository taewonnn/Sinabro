import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

// app.use(express.static('public'));

//localhost:300/index.html
//localhost:300/assets/index-a0aaa8b4.js
localhost: 3000 / app.use(express.static('dist'));

// Cross Origin Resource Sharing
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world from express');
});

app.get('/api/test', (req, res) => {
    res.json({ name: 'taeown', age: 32 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/vite.svg', (res, req) => {});

// Ex1.
// const handler1 = (req, res, next) => {
//     // ...

//     console.log('handler1');
//     next();
// };

// const handler2 = (req, res) => {
//     //...
//     console.log('handler2');
// };

// app.get('/test', handler1, handler2);

// Ex2.
// app.use((req, res, next) => {
//     console.log('hello');
//     next();
// });
