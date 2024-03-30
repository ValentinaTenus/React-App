import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';

import { CardsApi } from './cards-api';

const cardsApi = new CardsApi({
    baseUrl: config.ENV.API.PROXY_URL,
    http,
});

export { cardsApi };
export { type Card, type UpdateCardDto } from './types/types';
