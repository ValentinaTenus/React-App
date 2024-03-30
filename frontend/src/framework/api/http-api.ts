import { ContentType, ServerErrorType } from '~/common/enums/enums.js';
import {
    type ServerErrorResponse,
    type ValueOf,
} from '~/common/types/types.js';
import {
    configureString,
} from '~/helpers/helpers.js';

import { type IHttpApi } from './interfaces/interfaces.js';
import {
    type IHttp,
    HttpCode,
    HTTPError,
    HttpHeader,
} from '../http/http.js';
import { type HttpApiOptions, type HttpApiResponse } from './types/types.js';

type Constructor = {
    baseUrl: string;
    path: string;
    http: IHttp;
};

class HTTPApi implements IHttpApi {
    private baseUrl: string;

    private path: string;

    private http: IHttp;


    public constructor({ baseUrl, path, http }: Constructor) {
        this.baseUrl = baseUrl;
        this.path = path;
        this.http = http;
    }

    public async load(
        path: string,
        options: HttpApiOptions,
    ): Promise<HttpApiResponse> {
        const {
            method,
            contentType,
            payload = null,
            withCredentials = false,
        } = options;

        const headers = await this.getHeaders(contentType);

        let response = await this.http.load(path, {
            method,
            headers,
            payload,
            withCredentials,
        });

        return (await this.checkResponse(response)) as HttpApiResponse;
    }

    protected getFullEndpoint<T extends Record<string, string>>(
        ...parameters: [...string[], T]
    ): string {
        const copiedParameters = [...parameters];

        const options = copiedParameters.pop() as T;

        return configureString(
            this.baseUrl,
            this.path,
            ...(copiedParameters as string[]),
            options,
        );
    }

    private async getHeaders(
        contentType: ValueOf<typeof ContentType>,
    ): Promise<Headers> {
        const headers = new Headers();

        if (contentType !== ContentType.FORM_DATA) {
            headers.append(HttpHeader.CONTENT_TYPE, contentType);
        }

        return headers;
    }

    private async checkResponse(response: Response): Promise<Response | never> {
        if (!response.ok) {
            await this.handleError(response);
        }

        return response;
    }

    private async handleError(response: Response): Promise<never> {
        const parsedException = (await response.json().catch(
            (): ServerErrorResponse => ({
                errorType: ServerErrorType.COMMON,
                message: response.statusText,
            }),
        )) as ServerErrorResponse;

        const isCustomException = Boolean(parsedException.errorType);

        throw new HTTPError({
            status: response.status as ValueOf<typeof HttpCode>,
            errorType: isCustomException
                ? parsedException.errorType
                : ServerErrorType.COMMON,
            message: parsedException.message,
            details:
                'details' in parsedException ? parsedException.details : [],
        });
    }
}

export { HTTPApi as HttpApi };
