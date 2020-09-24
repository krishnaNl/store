import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ApiClientError} from './ApiClientError';

export interface IApiClientOptions {
  apiName: string;
}

export interface IApiClient {
  request(config: AxiosRequestConfig, options?: IApiClientOptions): Promise<any>;

  get(url: string, params?: {}, options?: IApiClientOptions): Promise<any>;

  post(url: string, data?: {}, params?: {}, options?: IApiClientOptions): Promise<any>;

  put(url: string, data?: {}, params?: {}, options?: IApiClientOptions): Promise<any>;

  patch(url: string, data?: {}, params?: {}, options?: IApiClientOptions): Promise<any>;

  delete(url: string, params?: {}, options?: IApiClientOptions): Promise<any>;

  getBaseUrl(): string;

  getRequestTimeout?(): number;

  getInterceptor(): IApiInterceptor | undefined;

  getAuthHelper(): IAuthHelper | undefined;

  setAuthHelper(authHelper: IAuthHelper): void;
}

export interface IAuthHelper {
  clearGuestUserData(): Promise<void>;

  getAccessToken(): Promise<string>;

  getRefreshToken(): Promise<string>;

  refreshTokens(): Promise<any>;

  flushTokens(): Promise<void>;

  getTraceId(): Promise<string>;

  saveTraceId(traceId: string): Promise<void>;
}

export interface IApiResponseHandler {
  success?(response: IApiResponse): any;

  error?(error: IApiError | ApiClientError): any;
}

export interface IApiInterceptor {
  request(apiClient: IApiClient): {
    onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected?: (error: any) => any,
  };

  response(apiClient: IApiClient): {
    onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any,
  };
}

export interface IApiClientConfig {
  baseUrl: string;
  requestTimeout?: number;
  interceptor?: IApiInterceptor;
  responseHandler?: IApiResponseHandler;
  useDefaultHandler?: boolean;
  authHelper?: IAuthHelper;
}

export interface IApiResponse<T = any> extends AxiosResponse<T> {
  config: IApiRequestConfig;
}

export interface IApiError<T = any> {
  config: IApiRequestConfig;
  response?: IApiResponse<T>;
}

// tslint:disable-next-line:no-empty-interface
export interface IApiRequestConfig extends AxiosRequestConfig {
  options?: IApiClientOptions;
}
