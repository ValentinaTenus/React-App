import { type ContentType } from '../../../common/enums/enums.js';
import { type ValueOf } from '../../../common/types/types.js';
import { type HttpOptions } from '../../../framework/http/http.js';

type HttpApiOptions = Omit<HttpOptions, 'headers' | 'payload'> & {
    hasAuth: boolean;
    contentType: ValueOf<typeof ContentType>;
    payload?: HttpOptions['payload'];
    withCredentials?: boolean;
};

export { type HttpApiOptions };
