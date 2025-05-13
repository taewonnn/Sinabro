// Promise 직접 만들어 보기

// test
// function returnPromise() {
//     return new Promise((resolve, reject) => {
//         //...
//         // resolve
//         resolve(3);
//         // reject
//         reject('this is an error');
//     });
// }

// const promise = returnPromise();
// const result = await promise;
// console.log('promise test', { result }); // {result: 3}

// promise test
function printDelayedMessage(message, timeout) {
    //
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(message);
            resolve('success');
        }, timeout);
    });
}

// top level
// top level에서 바로 await를 사용하는건 불가능
// console.log('before resolving Promise');

// try {
//     const res = await printDelayedMessage('one second', 1000);
// } catch (e) {
//     console.log('Error!', e);
// }

// console.log('after resolving Promise', { res });

// => async 함수 안에 넣어줘서 에러 해결
async function main() {
    console.log('before resolving Promise');

    try {
        const res = await printDelayedMessage('one second', 1000);
    } catch (e) {
        console.log('Error!', e);
    }

    console.log('after resolving Promise', { res });
}

main();
