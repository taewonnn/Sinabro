import { goto } from '../router';

export function getInitialHTML() {
    return `
        <h1>Movie Info</h1>
        <form>
            <input type="search" name="query" />
            <button type="submit">Search</button>
        </form>
    `;
}

export function renderIndex({ searchParams, initialData }) {
    document.querySelector('#app').innerHTML = getInitialHTML();

    document.body.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        goto(`/search?query=${event.target.query.value}`, { push: true });
    });
}
