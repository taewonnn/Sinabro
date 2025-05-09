let routes;

// popstate event - 뒤로갈 때 stack에서 뺄 때
window.addEventListener('popstate', (e) => {
    console.log('popstate Event!!', e);

    if (routes[location.pathname]) {
        console.log('!!', routes[location.pathname]());
        routes[location.pathname](); // 함수 호출
        return;
    }
});

// page 이동
export const goto = (url, { push } = {}) => {
    const pathname = url.split('?')[0];

    // query 가져오기
    const param = Object.fromEntries(new URLSearchParams(url.split('?')[1]));

    if (routes[pathname]) {
        if (push) {
            history.pushState({}, '', url);
        }
        routes[pathname]({
            searchParams: param,
        });
        return;
    }
    location.href = url;
};

export const start = (params) => {
    routes = params.routes;
    goto(location.pathname + location.search);
};
