import { renderIndex, getInitialHTML as getInitialHTMLForIndex } from './pages/index';
import { renderSearch, getInitialHTML as getInitialHTMLForSearch } from './pages/search';

export const routes = {
    '/': renderIndex,
    '/search': renderSearch,
};

export const getInitialHTML = {
    '/': getInitialHTMLForIndex,
    '/search': getInitialHTMLForSearch,
};
