import test from '/src/test.json?raw';

async function getProducts() {
    if (process.env.NODE_ENV === 'development') {
        return JSON.parse(test);
    } else {
        const response = await fetch('https://learnwitheunjae.dev/api/sinabro-js/ecommerce');
        return await response.json();
    }
}

// 장바구니 담은 상품 HTML
function getProductHTML(product, count = 0) {
    return `
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
}

export async function setupProducts({ container }) {
    //데이터
    const products = await getProducts();
    const productMap = {};
    products.forEach((product) => {
        productMap[product.id] = product;
    });
    console.log('products', products);

    document.querySelector('#products').innerHTML = products
        .map((product) => getProductHTML(product))
        .join('');

    // count update

    const updateCount = ({ productId, count }) => {
        const productElement = container.querySelector(
            `.product[data-product-id = '${productId}']`
        );
        const cartCount = productElement.querySelector('.cart-count');
        cartCount.innerHTML = count;
        if (count === 0) {
            cartCount.innerHTML = '';
        }
    };

    return { updateCount };
}
