import { ApiPath, ContentType } from '../../common/enums/enums.js';
import { HttpApi } from '../../framework/api/api.js';
import { type IHttp } from '../../framework/http/http.js';

import { ActivityApiPath } from './enums/enums.js';
import { type Activity } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
};

class ActivityApi extends HttpApi {
    public constructor({ baseUrl, http }: Constructor) {
        super({ path: ApiPath.ACTIVITY, baseUrl, http });
    }

    public async getAll(): Promise<Activity[]> {
        const response = await this.load(
            this.getFullEndpoint(ActivityApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<Activity[]>();
    }

    public async getByCardId(id: string): Promise<Activity[]> {
        const response = await this.load(
            this.getFullEndpoint(ActivityApiPath.ID, { id }),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<Activity[]>();
    }
}

export { ActivityApi };
