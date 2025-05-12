let routes;

// popstate event - 뒤로갈 때 stack에서 뺄 때
// window.addEventListener('popstate', (e) => {
//     console.log('popstate Event!!', e);
// });

// page 이동
export const goto = (url, { push } = {}) => {
    const pathname = url.split('?')[0]; // "/" | "/search" | ...

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

// 라우터 기능 페이지 이동
export const start = (params) => {
    routes = params.routes;

    window.addEventListener('popstate', (event) => {
        goto(location.pathname + location.search);
    });

    // if (routes[location.pathname]) {
    //     console.log('!!', routes[location.pathname]());
    //     routes[location.pathname](); // 함수 호출
    //     return;
    // }

    goto(location.pathname + location.search);
};
