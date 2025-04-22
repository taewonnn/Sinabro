// https://learnwitheunjae.dev/api/sinabro-js/ecommerce

import { setupCart } from './cart';
import { setupCounter } from './counter';
import { setupProducts, getProductElement } from './products';

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

// countMap 전달 받는 함수
function sumAllCounts(countMap) {
    // let sum = 0;
    // Object.values(countMap).forEach((number) => {
    //     sum += number;
    // });
    // return sum;

    // reduce 사용한 방식
    return Object.values(countMap).reduce((total, cur) => {
        total += cur;
        return total;
    }, 0);
}

async function main() {
    const { updateCount: updateProductCount, getProductById } = await setupProducts({ container: document.querySelector('#products') });
    let productMap = {};

    const { increase, decrease } = setupCounter();

    const { addProduct, removeProduct, updateCount: updateCartCount } = setupCart({ container: document.querySelector('.cart_items') });

    // count 저장
    const countMap = {};

    // 개수증가 함수
    const increaseCount = (productId) => {
        // counter.js 에서 미리 정의해놓은 increase
        const count = increase({ productId });
        console.log('product', getProductById({ productId }));

        updateProductCount({ productId, count: count });
        if (count === 1) {
            addProduct({ product: getProductById({ productId }) });
        }
        updateCartCount({ productId, count: count });
    };

    // 개수감소 함수
    const decreaseCount = (productId) => {
        // counter.js 에서 미리 정의해놓은 decrease
        const count = decrease({ productId });
        updateProductCount({ productId, count: count });
        updateCartCount({ productId, count: count });
        if (count === 0) {
            removeProduct({ product: getProductById({ productId }) });
        }
    };

    // + - 버튼 클릭 시
    document.querySelector('#products').addEventListener('click', (event) => {
        const targetElement = event.target;

        // 어떤 상품에서 버튼 클릭했는지 찾기!
        const productElement = findElement(targetElement, '.product');

        // product id 가져오기
        const productId = productElement.getAttribute('data-product-id');
        const product = productMap[productId];
        console.log('몇 번 상품 클릭 ? :', productId);

        // product index 가져오기
        const productIndex = productElement.getAttribute('data-product-index');
        // const product = products[productIndex];
        // console.log('몇 번 상품 인덱스', product);

        // 클릭 시 어떻게 가져오는지 확인
        // console.log('어떤 거 눌렀는지 target :', targetElement);

        // + - 버튼만 누르는게 아니라 이미지를 누를수도 있고 다른 것을 클릭 할 수 있으니,  + / -만 눌렀을 때로 범위 좁히기
        if (targetElement.matches('.btn-decrease') || targetElement.matches('.btn-increase')) {
            // - 눌렀을 때,
            if (targetElement.matches('.btn-decrease')) {
                console.log('decrease!');
                // countMap[productId] -= 1;  -> 함수로 refactoring
                decreaseCount(productId);

                // + 눌렀을 때,
            } else if (targetElement.matches('.btn-increase')) {
                // console.log('increase!');
                // countMap[productId] += 1;  -> 함수로 refactoring
                increaseCount(productId);
            }
        }
    });

    document.querySelector('.cart_items').addEventListener('click', () => {
        // 위에 #products의 코드와 동일(반복)
        const targetElement = event.target;

        // 어떤 상품에서 버튼 클릭했는지 찾기!
        const productElement = findElement(targetElement, '.product');

        // product id 가져오기
        const productId = productElement.getAttribute('data-product-id');
        const product = productMap[productId];

        // product index 가져오기
        const productIndex = productElement.getAttribute('data-product-index');

        // + - 버튼만 누르는게 아니라 이미지를 누를수도 있고 다른 것을 클릭 할 수 있으니,  + / -만 눌렀을 때로 범위 좁히기
        if (targetElement.matches('.btn-decrease') || targetElement.matches('.btn-increase')) {
            // - 눌렀을 때,
            if (targetElement.matches('.btn-decrease')) {
                console.log('decrease!');
                // countMap[productId] -= 1;  -> 함수로 refactoring
                decreaseCount(productId);

                // + 눌렀을 때,
            } else if (targetElement.matches('.btn-increase')) {
                console.log('increase!');
                // countMap[productId] += 1;  -> 함수로 refactoring
                increaseCount(productId);
            }
        }
    });

    // Cart(장바구니 모양) 버튼 클릭 시
    document.querySelector('.btn-cart').addEventListener('click', () => {
        // style에 display block으로 바꿔주는 방법
        // document.querySelector('.cart-layer').style.display = 'block';

        // classList 지워서 보여주는 방법
        // document.querySelector('.cart-layer').classList.remove('hidden');

        document.body.classList.add('displaying_cart');
    });

    // close 버튼 클릭 시
    document.querySelector('.btn-close-cart').addEventListener('click', () => {
        document.body.classList.remove('displaying_cart');
    });

    // cart 리스트 나왔을 때, 그 반대 빈 공간 클릭 시
    document.querySelector('.cart-dimmed-bg').addEventListener('click', () => {
        document.body.classList.remove('displaying_cart');
    });
}

main();
