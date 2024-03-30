import { config } from '../../framework/config/config.js';
import { http } from '../../framework/http/http.js';

import { ActivityApi } from './activity-api.js';

const activityApi = new ActivityApi({
    baseUrl: config.ENV.API.PROXY_URL,
    http,
});

export { activityApi };
export { type Activity } from './types/types';