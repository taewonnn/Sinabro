import fs from 'fs';

fs.readFile('test.txt', (error, file) => {
    if (error) {
        console.log('Error!', error);
    } else {
        console.log('file content', file.toString());
    }
});

console.log('test!');

// 비동기란?
// 위 파일 실행 시 test!가 먼저 실행되는 현상

// Promise
// test API
// https://jsonplaceholder.typicode.com/todos/
// https://jsonplaceholder.typicode.com/todos/1
