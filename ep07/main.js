// routes 정보
const routes = {
    '/': renderIndex,
    '/search': renderSearch,
};

// popstate event - 뒤로갈 때 stack에서 뺄 때
window.addEventListener('popstate', (e) => {
    console.log('popstate Event!!', e);
});

// page 이동
const goto = (url) => {
    const pathname = url.split('?')[0];
    if (routes[pathname]) {
        history.pushState({}, '', url);
        routes[pathname]();
        return;
    }
    location.href = url;
};

function renderIndex() {
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
        goto(`/search?query=${e.target.query.value}`);
    });
}
renderIndex();

function renderSearch() {
    document.querySelector('#app').innerHTML = `
      <h1>Search Result</h1>
    `;
}
// renderSearch();
