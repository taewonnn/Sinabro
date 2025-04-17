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

// countMap 총합 - 장바구니 옆 숫자
function sumAllCounts(countMap) {
    return Object.values(countMap).reduce((total, current) => {
        total += current;
        return total;
    }, 0);
}

function getProductHTML(product, count = 0) {
    return `
        <div class="product" data-product-id="${product.id}">
            <img src='${product.images[0]}' alt='Image of ${product.name}'/>
            <p>${product.name}</p>
            <div class="flex items-center justify-between">
                <span>Price: ${product.regularPrice}</span>
                <div>
                    <button type="button" disabled class="btn-decrease bg-green-200 hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50 py-1 px-3 rounded-full text-green-800 ">-</button>
                    <span class="cart-count text-green-800">${count === 0 ? '' : count}</span>
                    <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 py-1 px-3 rounded-full text-green-800 ">+</button>
                </div>
            </div>
        </div>
    `;
}

async function main() {
    const products = await getProducts();

    // 개수 저장용
    const countMap = {};

    // ‼️ Cart 보여주기용
    const productMap = {};
    products.forEach((product) => {
        productMap[product.id] = product;
    });

    document.querySelector('#products').innerHTML = products.map((product) => getProductHTML(product)).join('');

    // 상품 추가 제외 버튼 클릭 시
    document.querySelector('#products').addEventListener('click', (event) => {
        const targetElement = event.target;

        // console
        console.log('target:', targetElement);

        // .product 요소 위까지 올라가서 어떤 상품에서 + / - 버튼을 눌렀는지 체크해야 함    *이게 없다면 없다면 어느 상품을 추가/삭제했는지 식별 불가
        const productElemnet = findElement(targetElement, '.product');
        // console
        // console.log('find productElemnet: ', productElemnet);

        // product 요소 가져온거에서 Id추출
        const productId = productElemnet.getAttribute('data-product-id');
        console.log('+/- click한 상품 번호', productId);

        // product 정보 찾기
        // const product = products.find((product) => product.id === productId);
        const product = productMap[productId];

        // + / - 버튼 클릭 시
        if (targetElement.matches('.btn-decrease') || targetElement.matches('.btn-increase')) {
            // countMap에 상품이 안담겨있다면 0
            if (countMap[productId] === undefined) {
                countMap[productId] = 0;
            }

            if (targetElement.matches('.btn-decrease')) {
                // - 클릭 시
                if (countMap[productId] === 0) return;
                countMap[productId] -= 1;
            } else if (targetElement.matches('.btn-increase')) {
                countMap[productId] += 1;
            }

            const cartCount = productElemnet.querySelector('.cart-count');
            cartCount.innerHTML = countMap[productId];
            if (countMap[productId] === 0) {
                cartCount.innerHTML = '';
            } else {
                // 0이상이면 cart 목록에 보여주기
                const productIds = Object.keys(countMap);
                document.querySelector('.cart_items').innerHTML = productIds
                    .map((productId) => {
                        const productInCart = productMap[productId];
                        return getProductHTML(productInCart, countMap[productId]);
                    })
                    .join('');
            }

            // - 버튼
            const btnDecrease = productElemnet.querySelector('.btn-decrease');

            // 수량이 0 이상 -> 버튼 활성화
            if (countMap[productId] > 0) {
                btnDecrease.removeAttribute('disabled');
            } else if (countMap[productId] == '') {
                btnDecrease.setAttribute('disabled', true);
            }

            // console.log('!!', countMap); // {"70": 2, "75": 1,"76": 1}
            console.log(Object.values(countMap));

            // 상단 cart 숫자개수 업데이트
            document.querySelector('.total_count').innerHTML = `(${sumAllCounts(countMap)})`;
        }
    });

    // cart 클릭 시 장바구니 목록 노출
    document.querySelector('.btn-cart').addEventListener('click', () => {
        // document.querySelector('.cart-layer').style.display = 'block';
        document.body.classList.add('displaying_cart');
    });

    // 장바구니 목록 close 버튼 클릭 시
    document.querySelector('.btn-close-cart').addEventListener('click', () => {
        document.body.classList.remove('displaying_cart');
    });

    // 바깥 화면 클릭 시 닫힘 처리
    document.querySelector('.cart-dimmed-bg').addEventListener('click', () => {
        document.body.classList.remove('displaying_cart');
    });
}

main();
