import {ApiClientError, IApiClientError} from './ApiClientError';
import {DEFAULT_ERROR_MESSAGE, HttpStatusCode,} from './Constants';
import {IApiError, IApiResponse, IApiResponseHandler} from './Interfaces';
import Logger from "../Utils/Logger";

export default class ApiResponseHandler implements IApiResponseHandler {


    public success = (response: IApiResponse) => {
        const responseBody = response.data;
        // @ts-ignore
        if (!responseBody) {
            if (HttpStatusCode.NoContent !== response.status) {
                Logger.warn(`Empty response body. Response: ${response}`);
            }
            return {};
        }

        if (!this.isJsonResponse(response)) {
            Logger.warn(`Response is not a JSON. ${responseBody}`);
        }
        return responseBody;
    }

    public error = (error: IApiError): ApiClientError => {
        Logger.warn(`API error. Content: ${JSON.stringify(error)}`);

        let errorDetails: IApiClientError = {
            message: DEFAULT_ERROR_MESSAGE,
        } as IApiClientError;


        const errorResponse = error.response;
        if (!errorResponse) {
            Logger.warn(`No response in error. Error: ${JSON.stringify(error)}`);

            return new ApiClientError(DEFAULT_ERROR_MESSAGE, errorDetails);
        }

        if (!this.isJsonResponse(errorResponse)) {
            Logger.warn(`Response is not a JSON. Response content: ${JSON.stringify(errorResponse)}`);
            return  new ApiClientError('Response is not a JSON. Response content', errorDetails);
        }

        errorDetails = {
            statusCode: errorResponse.status,
            message: errorDetails.message,
            description: errorResponse.data ? JSON.stringify(errorResponse.data) : '',
            errors: errorDetails.errors || [],
            original: errorResponse.data,
        } as IApiClientError;
        return new ApiClientError(errorDetails.message, errorDetails);
    }

    private isJsonResponse = (response: IApiResponse): boolean => {
        const headers = response.headers || {};
        const responseBody = response.data || '';
        const contentType = headers['content-type'] || '';
        if (contentType.indexOf('application/json') > -1 &&
            (ObjectUtils.isOfType('array', responseBody) || ObjectUtils.isOfType('object', responseBody))) {
            return true;
        }

        return false;
    }


}
