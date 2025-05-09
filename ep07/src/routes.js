import { renderIndex } from './pages';
import { renderSearch } from './pages/search';

export const routes = {
    '/': renderIndex,
    '/search': renderSearch,
};
