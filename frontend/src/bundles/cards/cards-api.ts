import { UpdateCardDto } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';

import { CardsApiPath } from './enums/enums.js';
import { CreateCardDto, type Card } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
};

class CardsApi extends HttpApi {
    public constructor({ baseUrl, http }: Constructor) {
        super({ path: ApiPath.CARDS, baseUrl, http });
    }

    public async getAll(): Promise<Card[]> {
        const response = await this.load(
            this.getFullEndpoint(CardsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<Card[]>();
    }

    public async create(payload: CreateCardDto): Promise<Card> {
        const response = await this.load(
            this.getFullEndpoint(CardsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<Card>();
    }

    public async update(id: string, payload: UpdateCardDto): Promise<Card> {
        const response = await this.load(
            this.getFullEndpoint(CardsApiPath.ID, {id}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );
        return await response.json<Card>();
    }

    public async delete(id: string): Promise<Card> {
        const response = await this.load(
            this.getFullEndpoint(CardsApiPath.ID, {id}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );
        return await response.json<Card>();
    }
}

export { CardsApi };
