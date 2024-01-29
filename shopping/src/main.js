// https://learnwitheunjae.dev/api/sinabro-js/ecommerce

import test from '/src/test.json?raw';

async function getProducts() {
    if (process.env.NODE_ENV === 'development') {
        return JSON.parse(test);
    } else {
        const response = await fetch('https://learnwitheunjae.dev/api/sinabro-js/ecommerce');
        return await response.json();
    }
}

// countMap 전달 받는 함수
function sumAllCounts(countMap) {
    // let sum = 0;
    // Object.values(countMap).forEach((number) => {
    //     sum += number;
    // });
    // return sum;

    // reduce 사용한 방식
    Object.values(countMap).reduce((total, current) => {
        total += current;
        return total;
    }, 0);
}

// decrease / increase 눌렀는데 어떤 상품을 누른 건지 알아야 하기위해!
// 어떤 상품인지 찾는 함수
function findElement(startingElement, selector) {
    let currentElement = startingElement;
    while (currentElement) {
        if (currentElement.matches(selector)) {
            return currentElement;
        }
        currentElement = currentElement.parentElement;
    }
    return null;
}

async function main() {
    console.log('💡', process.env.NODE_ENV); // 💡 development

    // 데이터
    const products = await getProducts();
    console.log('products', products);

    // count 저장
    const countMap = {};

    document.querySelector('#products').innerHTML = products
        .map(
            (product, index) => `
    <div class='product' data-product-id='${product.id}' data-product-index='${index}'>
      <img src='${product.images[0]}' alt='Image of ${product.name}' />
      <p>${product.name}</p>
      <div class='flex items-center justify-between'>
        <span>Price : ${product.regularPrice}</span>
        <button type='button' class='btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 px-4 py-1 rounded-full'>-</button>
        <span class='cart-count text-green-800'></span>
        <button type='button' class='btn-increase bg-green-200 hover:bg-green-300 text-green-800 px-4 py-1 rounded-full'>+</button>
      </div>
    </div>
  `
        )
        .join('');

    // 방법1 - 버튼마다 이벤트 붙여주기
    // Array.from(document.querySelectorAll('.btn-decrease')).forEach(button => {
    //   button.addEventListener('click', (event) => {
    //
    //   })
    // })

    // 방법2 - 전체를 가져오기
    document.querySelector('#products').addEventListener('click', (event) => {
        const targetElement = event.target;

        // 어떤 상품에서 버튼 클릭했는지 찾기!
        const productElement = findElement(targetElement, '.product');
        // console.log(productElement);

        // product id 가져오기
        const productId = productElement.getAttribute('data-product-id');
        console.log('몇 번 상품 클릭 ? :', productId);

        // product index 가져오기
        const productIndex = productElement.getAttribute('data-product-index');
        const product = products[productIndex];
        console.log('몇 번 상품 인덱스', product);

        // 클릭 시 어떻게 가져오는지 확인
        // console.log('어떤 거 눌렀는지 target :', targetElement);

        // + - 버튼만 누르는게 아니라 이미지를 누를수도 있고 다른 것을 클릭 할 수 있으니,  + / -만 눌렀을 때로 범위 좁히기
        if (targetElement.matches('.btn-decrease') || targetElement.matches('.btn-increase')) {
            if (countMap[productId] === undefined) {
                countMap[productId] = 0;
            }

            // - 눌렀을 때,
            if (targetElement.matches('.btn-decrease')) {
                console.log('decrease!');
                countMap[productId] -= 1;
                // + 눌렀을 때,
            } else if (targetElement.matches('.btn-increase')) {
                console.log('increase!');
                countMap[productId] += 1;
            }
            const cartCount = productElement.querySelector('.cart-count');
            cartCount.innerHTML = countMap[productId];
            if (countMap[productId] === 0) {
                cartCount.innerHTML = '';
            }

            // console.log('!!!', document.querySelector('.total_count'));
            document.querySelector('.total_count').innerHTML = `(${sumAllCounts(countMap)})`;
        }
    });
}

main();
