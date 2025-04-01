import { getProductElement } from './products';

export function setupCart({ container }) {
    // add Procut
    const addProduct = ({ product }) => {
        const productElement = document.createElement('div');
        container.appenChild(productElemnet);
    };

    // remove product
    const removeProduct = ({ product }) => {
        const productElement = container.querySelector(`.product[data-product-id='${product.id}']`);
    };
    productElement.rmove();

    return { removeProduct };

    // updateCount
}
