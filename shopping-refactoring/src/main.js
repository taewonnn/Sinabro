// https://learnwitheunjae.dev/api/sinabro-js/ecommerce

import { setupCart } from './cart';
import { setupCounter } from './counter';
import { setupProducts, getProductElement } from './products';
import { findElement } from './util';

async function main() {
    // 개수증가 함수
    const onIncreaseClick = (productId) => {
        // counter.js 에서 미리 정의해놓은 increase
        const count = increase({ productId });
        console.log('product', getProductById({ productId }));

        updateProductCount({ productId, count: count });
        if (count === 1) {
            addProduct({ product: getProductById({ productId }) });
        }
        updateCartCount({ productId, count: count });
        updateTotalCount(getTotalCount());
    };

    // 개수감소 함수
    const onDecreaseClick = (productId) => {
        // counter.js 에서 미리 정의해놓은 decrease
        const count = decrease({ productId });
        updateProductCount({ productId, count: count });
        updateCartCount({ productId, count: count });
        if (count === 0) {
            removeProduct({ product: getProductById({ productId }) });
        }
        updateTotalCount(getTotalCount());
    };

    const { updateCount: updateProductCount, getProductById } = await setupProducts({
        container: document.querySelector('#products'),
        onDecreaseClick,
        onIncreaseClick,
    });
    let productMap = {};

    const { increase, decrease, getTotalCount } = setupCounter();

    const { addProduct, removeProduct, updateCount: updateCartCount } = setupCart({ container: document.querySelector('.cart_items') });

    // total count
    const updateTotalCount = (totalCount) => {
        document.querySelector('.total_count').innerHTML = `(${totalCount})`;
    };

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
