export function renderSearch({ searchParams }) {
    // console.log(searchParams);
    document.querySelector('#app').innerHTML = `
        <h1>Search Result</h1>
        <p>keyword:${searchParams.query}</p>
    `;
}
