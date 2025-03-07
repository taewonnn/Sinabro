/**
 * API
 *  https://learnwitheunjae.dev/api/sinabro-js/ecommerce
 */

import test from '/src/test.json?raw';

async function getProducts() {
    // dev 환경
    if (process.env.NODE_ENV === 'development') {
        return JSON.parse(test);
    } else {
        // prod 환경
        const response = await fetch('https://learnwitheunjae.dev/api/sinabro-js/ecommerce');
        return await response.json();
    }
}

// 요소 찾는 함수
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
    const products = await getProducts();

    document.querySelector('#products').innerHTML = products
        .map(
            (product, index) => `
                <div class="product" data-product-id="${product.id}" data-product-index="${index}">
                    <img src='${product.images[0]}' alt='Image of ${product.name}'/>
                    <p>${product.name}</p>
                    <div class="flex items-center justify-between">
                        <span>Price: ${product.regularPrice}</span>
                        <div>
                            <button type="button" class="btn-decrease bg-green-200 hover:bg-green-300 py-1 px-3 rounded-full text-green-800 ">-</button>
                            <span class="hidden text-green-800">3</span>
                            <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 py-1 px-3 rounded-full text-green-800 ">+</button>
                        </div>
                    </div>
                </div>
            `
        )
        .join('');

    // 상품 추가 제외 버튼 클릭 시
    document.querySelector('#products').addEventListener('click', (event) => {
        const targetElement = event.target;

        // .product 요소 위까지 올라가서 어떤 상품에서 + / - 버튼을 눌렀는지 체크해야 함    *이게 없다면 없다면 어느 상품을 추가/삭제했는지 식별 불가
        const productElemnet = findElement(targetElement, '.product');
        // console
        // console.log('find productElemnet: ', productElemnet);

        // product 요소 가져온거에서 Id추출
        const productId = productElemnet.getAttribute('data-product-id');
        console.log('+/- click한 상품 번호', productId);

        // products에서 클릭한 상품의 Index로 정보 가져오기
        const productIndex = productElemnet.getAttribute('data-product-index');
        console.log('+/- click한 상품 정보', products[productIndex]);

        if (targetElement.matches('.btn-decrease')) {
            console.log('decrease!!!');
        } else if (targetElement.matches('.btn-increase')) {
            console.log('increase!');
        }
    });
}

main();
