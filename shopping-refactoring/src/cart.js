import { getProductElement } from './products';

export function setupCart({ container }) {
    const addProduct = ({ product }) => {
        const productElement = document.createElement('div');
        container.appendChild(productElement);
    };

    const removeProduct = ({ product }) => {
        const productElement = container.querySelector(
            `.product[data-product-id = '${product.id}']`
        );
        productElement.remove();
    };

    return {
        //addProduct
        //removeProduct
        //updateCount
    };
}
