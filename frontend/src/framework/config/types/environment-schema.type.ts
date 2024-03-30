import { type AppEnvironment } from '../../../common/enums/enums.js';
import { type ValueOf } from '../../../common/types/types.js';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
        DOMAIN_URL: string;
    };
    API: {
        ORIGIN_URL: string;
        PROXY_URL: string;
    };
};

export { type EnvironmentSchema };
