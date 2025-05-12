import { routes, getInitialHTML } from './src/routes';
import { start } from './src/router';

export { getInitialHTML };

// 브라우저에서 실행할 땐 실행 / 서버에서는 실행하면 안돼!

if (typeof window !== 'undefined') {
    start({
        routes: routes,
    });
}
