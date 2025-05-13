import fs from 'fs';
import util from 'util';

// 비동기란?
// 위 파일 실행 시 test!가 먼저 실행되는 현상
// fs.readFile('package.json', (error, file) => {
//     console.log('### result ###');
//     console.log(file.toString());
// });

// console.log('test!');

// Promise
function readFilePromise(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (error, file) => {
            if (error) {
                reject(error);
            } else {
                resolve(file);
            }
        });
    });
}

try {
    const file = await readFilePromise('package.json');
    console.log(file.toString());
} catch (e) {
    console.log('Error', e);
}

console.log('test');

console.log('!!!!!!!-----!!!!!!!');

//nodejs -> promisify
const readFilePromise2 = util.promisify(fs.readFile);
try {
    const file = await readFilePromise2('package.json');
    console.log('promisify resolve', file.toString());
} catch (e) {
    console.log('promisify Error', e);
}
