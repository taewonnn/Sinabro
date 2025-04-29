// https://learnwitheunjae.dev/api/sinabro-js/ecommerce

import { setupCart } from './cart';
import { setupCounter } from './counter';
import { setupProducts, getProductElement } from './products';

async function main() {
    const { updateCount: updateProductCount, getProductById } = await setupProducts({
        container: document.querySelector('#products'),
        onDecreaseClick,
        onIncreaseClick,
    });

    const { increase, decrease, getTotalCount, getCountByProductId } = setupCounter();

    const {
        addProduct,
        removeProduct,
        updateCount: updateCartCount,
    } = setupCart({ container: document.querySelector('.cart_items'), onDecreaseClick, onIncreaseClick });

    // total count
    const updateTotalCount = (totalCount) => {
        document.querySelector('.total_count').innerHTML = `(${totalCount})`;
    };

    // 개수증가 함수
    function onIncreaseClick({ productId }) {
        if (getCountByProductId({ productId }) == 0) {
            addProduct({ product: getProductById({ productId }) });
        }

        updateTotalCount(getTotalCount());
    }

    // 개수감소 함수
    function onDecreaseClick({ productId }) {
        // counter.js 에서 미리 정의해놓은 decrease
        const count = decrease({ productId });

        if (count === 0) {
            removeProduct({ product: getProductById({ productId }) });
        }
        updateTotalCount(getTotalCount());
    }

    // Cart(장바구니 모양) 버튼 클릭 시
    document.querySelector('.btn-cart').addEventListener('click', () => {
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
