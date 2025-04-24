import test from '/src/test.json?raw';
import { findElement } from './util';

/** 상품 정보 API */
async function getProducts() {
    if (process.env.NODE_ENV === 'development') {
        return JSON.parse(test);
    } else {
        const response = await fetch('https://learnwitheunjae.dev/api/sinabro-js/ecommerce');
        return await response.json();
    }
}

/** 담긴 상품 HTML */
export function getProductElement(product, count = 0) {
    const element = document.createElement('div');
    element.classList.add('product');
    element.setAttribute('data-product-id', product.id);
    element.innerHTML = `
        <div class='product' data-product-id='${product.id}'>
            <img src='${product.images[0]}' alt='Image of ${product.name}' />
            <p>${product.name}</p>
            <div class='flex items-center justify-between'>
                <span>Price : ${product.regularPrice}</span>
                <button type='button' class='btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 px-4 py-1 rounded-full'>-</button>
                <span class='cart-count text-green-800'>${count === 0 ? '' : count}</span>
                <button type='button' class='btn-increase bg-green-200 hover:bg-green-300 text-green-800 px-4 py-1 rounded-full'>+</button>
            </div>
        </div>
        `;
    return element;
}

export async function setupProducts({ container, onIncreaseClick, onDecreaseClick }) {
    // 데이터
    const products = await getProducts();
    const productMap = {};
    products.forEach((product) => {
        productMap[product.id] = product;
    });

    products.forEach((product) => {
        const productElement = getProductElement(product);
        container.appendChild(productElement);
    });

    // + - 버튼 클릭 시
    container.addEventListener('click', (event) => {
        const targetElement = event.target;

        // 어떤 상품에서 버튼 클릭했는지 찾기!
        const productElement = findElement(targetElement, '.product');

        // product id 가져오기
        const productId = productElement.getAttribute('data-product-id');
        console.log('몇 번 상품 클릭 ? :', productId);

        // + - 버튼만 누르는게 아니라 이미지를 누를수도 있고 다른 것을 클릭 할 수 있으니,  + / -만 눌렀을 때로 범위 좁히기
        if (targetElement.matches('.btn-decrease') || targetElement.matches('.btn-increase')) {
            // - 눌렀을 때,
            if (targetElement.matches('.btn-decrease')) {
                onDecreaseClick(productId);

                // + 눌렀을 때,
            } else if (targetElement.matches('.btn-increase')) {
                onIncreaseClick(productId);
            }
        }
    });

    // count update
    const updateCount = ({ productId, count }) => {
        const productElement = container.querySelector(`.product[data-product-id = '${productId}']`);
        console.log('prd', productElement);
        const cartCount = productElement.querySelector('.cart-count');
        cartCount.innerHTML = count;
        if (count === 0) {
            cartCount.innerHTML = '';
        }
    };

    // id에 맞는 Product
    const getProductById = ({ productId }) => {
        return productMap[productId];
    };

    return { updateCount, getProductById };
}
