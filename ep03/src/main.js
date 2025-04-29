document.querySelector('#app').innerHTML = `
  <div class="container mx-auto py-8">
    <h1 class="text-5xl font-mono font-extrabold">
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Node.js!</span>
    </h1>
    <pre id="result"></pre>
  </div>
`;

// api로 받아서 넣어주기

async function fetchDatatAndDisplay() {
    console.log(process.env.NODE_ENV);

    const API_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
    const res = await fetch(`${API_HOST}/api/test`);
    const json = await res.json();

    document.querySelector('#result').innerHTML = JSON.stringify(json, null, 2);
}

fetchDatatAndDisplay();
