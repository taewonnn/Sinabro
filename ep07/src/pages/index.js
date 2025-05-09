import { goto } from '../router';

export function renderIndex() {
    document.querySelector('#app').innerHTML = `
        <h1>Movie Info</h1>
        <form>
        <input type="search" name="query" />
        <button typ="submit">Search</button>
        </form>
    `;

    document.body.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        // 입력값
        const data = e.target.query.value;
        // const {
        //     query: { value: data },
        // } = e.target;

        console.log('submitted!', data);

        // page 이동
        goto(`/search?query=${e.target.query.value}`, { push: true });
    });
}
