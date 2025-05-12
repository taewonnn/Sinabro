import { start } from './src/router';
import { routes, getInitialHTML } from './src/routes';

export { getInitialHTML };

// 브라우저에서 실행할 땐 실행 / 서버에서는 실행하면 안돼!
if (typeof window !== 'undefined') {
    console.log('starting the client-side routing...');
    console.log('initial data', window.__INITIAL_DATA__);

    start({
        routes,
    });
}
