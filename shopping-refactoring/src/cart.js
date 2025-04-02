import { getProductElement } from './products';

export function setupCart({ container }) {
    // add Procut
    const addProduct = ({ product }) => {
        const productElement = getProductElement(product);
        container.appenChild(productElemnet);
    };

    // remove product
    const removeProduct = ({ product }) => {
        const productElement = container.querySelector(`.product[data-product-id='${product.id}']`);
    };
    productElement.rmove();

    // count update
    const updateCount = ({ productId, count }) => {
        const productElement = container.querySelector(`.product[data-product-id = '${productId}']`);
        const cartCount = productElement.querySelector('.cart-count');
        cartCount.innerHTML = count;
        if (count === 0) {
            cartCount.innerHTML = '';
        }
    };

    return { addProduct, removeProduct, updateCount };
}
