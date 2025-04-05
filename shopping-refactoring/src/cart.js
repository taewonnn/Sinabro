import { getProductElement } from './products';

export function setupCart({ container }) {
    // add Procut
    const addProduct = ({ product }) => {
        const productElement = getProductElement(product);
        container.appenChild(productElement);
    };

    // remove product
    const removeProduct = ({ product }) => {
        const productElement = container.querySelector(`.product[data-product-id='${product.id}']`);
        productElement.remove();
    };

    // count update
    const updateCount = ({ productId, count }) => {
        const productElement = container.querySelector(`.product[data-product-id='${productId}']`);
        console.log('update product', productElement);
        const cartCount = productElement.querySelector('.cart-count');
        cartCount.innerHTML = count;
        if (count === 0) {
            cartCount.innerHTML = '';
        }
    };

    return { addProduct, removeProduct, updateCount };
}
