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

// decrease / increase 눌렀는데 어떤 상품을 누른 건지 알아야 하기위해!
// 어떤 상품인지 찾는 함수
function findElement(startingElement, selector) {
  let currentElement = startingElement;
  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}


async function main() {
  console.log('💡', process.env.NODE_ENV);   // 💡 development

  // if( process.env.NODE_ENV === 'development')

  const products = await getProducts();
  console.log('products', products)

  document.querySelector('#products').innerHTML = 
  products.map((product, index) => `
    <div class='product' data-product-id='${product.id}' data-product-index='${index}'>
      <img src='${product.images[0]}' alt='Image of ${product.name}' />
      <p>${product.name}</p>
      <div class='flex items-center justify-between'>
        <span>Price : ${product.regularPrice}</span>
        <button type='button' class='btn-decrease bg-green-200 hover:bg-green-300 text-green-800 px-4 py-1 rounded-full'>-</button>
        <span class='text-green-800 hidden'>3</span>
        <button type='button' class='btn-increase bg-green-200 hover:bg-green-300 text-green-800 px-4 py-1 rounded-full'>+</button>
      </div>
    </div>
  `
  ).join('')

  // 방법1
  // Array.from(document.querySelectorAll('.btn-decrease')).forEach(button => {
  //   button.addEventListener('click', (event) => {
  //
  //   })
  // })
  
  
  // 방법2
  document.querySelector('#products').addEventListener('click', (event) => {
    const targetElement = event.target;

    // 어떤 상품에서 버튼 클릭했는지 찾기!
    const productElement = findElement(targetElement, ".product");
    // console.log(productElement);

    // product id 가져오기
    const productId = productElement.getAttribute('data-product-id');
    console.log('몇 번 상품 클릭 ? :', productId)

    // product index 가져오기
    const productIndex = productElement.getAttribute('data-product-index');
    const product = products[productIndex];
    console.log('몇 번 상품 인덱스',product)
    



    if (targetElement.matches('.btn-decrease')) {
      console.log('decrease!');
    } else if (targetElement.matches('.btn-increase')) {
      console.log('increase!');
    }
  })

}

main();