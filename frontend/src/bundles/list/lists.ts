import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';

import { ListsApi } from './lists-api';

const listsApi = new ListsApi({
    baseUrl: config.ENV.API.PROXY_URL,
    http,
});

export { listsApi };
export { type List } from './types/types';
