import { ApiPath, ContentType } from '../../common/enums/enums.js';
import { HttpApi } from '../../framework/api/api.js';
import { type IHttp } from '../../framework/http/http.js';

import { ListsApiPath } from './enums/enums.js';
import { List, type ListWithCards } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
};

class ListsApi extends HttpApi {
    public constructor({ baseUrl, http }: Constructor) {
        super({ path: ApiPath.LISTS, baseUrl, http });
    }

    public async getAll(): Promise<ListWithCards[]> {
        const response = await this.load(
            this.getFullEndpoint(ListsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<ListWithCards[]>();
    }

    public async create(payload: Partial<List>): Promise<ListWithCards> {
        const response = await this.load(
            this.getFullEndpoint(ListsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<ListWithCards>();
    }

    public async update(id: string, payload: Partial<List>): Promise<ListWithCards> {
        const response = await this.load(
            this.getFullEndpoint(ListsApiPath.ID, {id}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<ListWithCards>();
    }

    public async delete(id: string): Promise<ListWithCards> {
        const response = await this.load(
            this.getFullEndpoint(ListsApiPath.ID, {id}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<ListWithCards>();
    }
}

export { ListsApi };
