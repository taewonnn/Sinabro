import { getProductElement } from './products';
import { findElement } from './utils';

export function setupCart({ container, onDecreaseClick, onIncreaseClick }) {
    container.addEventListener('click', (event) => {
        const targetElement = event.target;
        // 어떤 상품에서 버튼 클릭했는지 찾기!
        const productElement = findElement(targetElement, '.product');
        // product id 가져오기
        const productId = productElement.getAttribute('data-product-id');

        // + - 버튼만 누르는게 아니라 이미지를 누를수도 있고 다른 것을 클릭 할 수 있으니,  + / -만 눌렀을 때로 범위 좁히기
        if (targetElement.matches('.btn-decrease') || targetElement.matches('.btn-increase')) {
            // - 눌렀을 때,
            if (targetElement.matches('.btn-decrease')) {
                console.log('cart decrease!');
                onDecreaseClick({ productId });

                // + 눌렀을 때,
            } else if (targetElement.matches('.btn-increase')) {
                console.log('cart increase!');
                onIncreaseClick({ productId });
            }
        }
    });

    // add Procut
    const addProduct = ({ product }) => {
        const productElement = getProductElement(product);
        container.appendChild(productElement);
    };

    // remove product
    const removeProduct = ({ product }) => {
        const productElement = container.querySelector(`.product[data-product-id='${product.id}']`);
        productElement.remove();
    };

    // count update
    const updateCount = ({ productId, count }) => {
        const productElement = container.querySelector(`.product[data-product-id='${productId}']`);
        console.log('cart', productElement);
        const cartCount = productElement.querySelector('.cart-count');
        cartCount.innerHTML = count;
        if (count === 0) {
            cartCount.innerHTML = '';
        }
    };

    return { addProduct, removeProduct, updateCount };
}
