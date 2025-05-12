export async function renderSearch({ searchParams }) {
    document.querySelector('#app').innerHTML = `
        <h1>Search Result</h1>
        <p>Search for:${searchParams.query}...</p>
    `;

    const res = await fetch(`http://localhost:3000/search?query=${searchParams.query}`);
    const movies = await res.json();

    document.querySelector('#app').innerHTML = `
    <h1>Search Result</h1>
    ${movies
        .map(
            (movie) => `
                <div>
                    <p>${movie.title}</p>
                </div>
            `
        )
        .join('')}
`;
}
