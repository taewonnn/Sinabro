console.log('async');

// fetch - await 없이
// const restest = fetch('https://jsonplaceholder.typicode.com/todos/');
// console.log({ restest });
// 단순 restest 결과값
// {res: Promise}res: Promise {<fulfilled>: Response}[[Prototype]]: Object

// await
// const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
// console.log({ res });
// {
//     res: Response {type: 'cors', url: 'https://jsonplaceholder.typicode.com/todos/', redirected: false, status: 200, ok: true, …}
// }

// Promise
// fetch('https://jsonplaceholder.typicode.com/todos/')
//     .then((res) => {
//         console.log('Promise resolved', res);
//     })
//     .catch((e) => {
//         console.log('Promise rejected', e);
//     });

// async / await
// try {
//     const result = await fetch('https://jsonplaceholder.typicode.com/todos/');
//     console.log('async/await resolved', result);
// } catch {
//     console.log('async/await rejected', e);
// }

// ‼️ async await 붙이든 안붙이든 Promise를 반환
// 직접 사용할 때, await을 붙여야 res 리턴
// async function getTodo(id) {
//     return await fetch(`https://jsonplaceholder.typicode.com/todos/{id}`);
// }

async function getTodo(id) {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
}

console.log('getTodo1', getTodo(1), '!!', await getTodo(1));

// todo - 1
const res = await getTodo(1);
const json = await res.json(); // json()함수도 promise를 return하기에 await을 붙여

console.log('json', json);

// todo - 2
const res2 = await getTodo(2);
const json2 = await res2.json(); // json()함수도 promise를 return하기에 await을 붙여

console.log('json2', json2);

// todo - 3
const res3 = await getTodo(3);
const json3 = await res3.json(); // json()함수도 promise를 return하기에 await을 붙여

console.log('json3', json3);

// 한 번에 받고 싶을 떄, Prmomise.all([])
// 만약 각각 await해서 리턴한다면 1은 1초 2는 2초 3은 3초가 걸린다고 치면 총 6초가 걸림
// 하지만 promise.all을 사용한다면 3초만에 3개를 모두 가져옴
const promise1 = getTodo(1);
const promise2 = getTodo(2);
const promise3 = getTodo(3);

const allRes = await Promise.all([promise1, promise2, promise3]);
console.log({ allRes }); // {allRes: Array(3)}

// json
const jsonPromise1 = allRes[0].json();
const jsonPromise2 = allRes[1].json();
const jsonPromise3 = allRes[2].json();

const allJsons = await Promise.all([jsonPromise1, jsonPromise2, jsonPromise3]);
console.log('alljsons', { allJsons });

// refactoring
