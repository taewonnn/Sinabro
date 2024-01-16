console.log('hello');

// body에 직접 추가
// document.body.innerHTML = "<h1>hello world</h1>";

const h1 = document.createElement('h1');
h1.innerText = 'hello world'
h1.style.color = 'red';
h1.classList.add('title');
document.body.appendChild(h1);
//document.body.prepend(h1);

const p1 = document.createElement('p');
p1.innerText = '111'
document.body.appendChild(p1);
const p2 = document.createElement('p');
p2.innerText = '222'
document.body.appendChild(p2);
const p3= document.createElement('p');
p3.innerText = '333'
document.body.appendChild(p3);




console.log(document.querySelectorAll('p'))
// NodeList [p, p, p]  

// array가 아닌 점 주의!!! array로 변환해주기 위해서는 Array.from()
console.log(Array.from(document.querySelectorAll('p')))


// addEventListener

document.querySelector('#app').innerHTML = `
  <button type='button' class='hello1'>Hello1</button>
  <button type='button' class='hello2'>Hello2</button>
  <button type='button' class='hello3'>Hello3</button>

  <div>
    <input class='name' type='text' placeholder='Type your name'/>
  </div>

  <div class='parent'>
    <button class='hello' type='button'>
      <span>Hello</span>
      <span>World</span>
    </button>
  </div>
`

document.querySelector('button').addEventListener('click', function (event) {
  console.log(event);
  
  const input = document.querySelector('.name');
  console.log(input.value)
})

document.querySelector('.name').addEventListener('change', (event) => {
  console.log(event.target.value);
})


// 이벤트 버블링 -> 부모에 이벤트리스너가 있으면 실행 시켜준다 올라가면서
document.querySelector('.hello').addEventListener('click', (event) => {
  // 더 위로 올라가지 말고 여기서만 이벤트 발생시키게!
  // event.stopPropagation();
  console.log('event from button',event);
})

document.querySelector('.parent').addEventListener('click', (event) => {
  console.log('event from div',event);
})