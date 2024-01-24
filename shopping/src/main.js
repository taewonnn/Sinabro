// https://learnwitheunjae.dev/api/sinabro-js/ecommerce

import test from '/src/test.json?raw';

async function getProducts() {
  if (process.env.NODE_ENV === 'development') {
    return JSON.parse(test);
  } else {
    const response = await fetch('https://learnwitheunjae.dev/api/sinabro-js/ecommerce');
    return await response.json()
  }
}

async function main() {
  console.log('💡', process.env.NODE_ENV);   // 💡 development

  // if( process.env.NODE_ENV === 'development')

  const products = await getProducts();
  console.log('products', products)

  document.querySelector('#products').innerHTML = 
  products.map((product) => `
    <div class='product'>
      <img src='${product.images[0]}' alt='Image of ${product.name}' />
      <p>${product.name}</p>
      <div class='flex items-center justify-between'>
        <span>Price : ${product.regularPrice}</span>
        <button type='button' class='bg-green-200 hover:bg-green-300 text-green-800 px-4 py-1 rounded-full'>-</button>
        <span class='text-green-800 hidden'>3</span>
        <button type='button' class='bg-green-200 hover:bg-green-300 text-green-800 px-4 py-1 rounded-full'>+</button>
      </div>
    </div>
  `
  ).join('')



}

main();