import {isEmpty} from 'lodash';
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import ApiResponseHandler from './ApiResponseHandler';
import {DEFAULT_API_TIMEOUT, HttpMethod} from './Constants';
import {
  IApiClient,
  IApiClientConfig, IApiClientOptions, IApiError,
  IApiInterceptor, IApiResponse,
  IApiResponseHandler, IAuthHelper,
} from './Interfaces';

const createClient = (apiClient: IApiClient): AxiosInstance => {
  const baseURL = apiClient.getBaseUrl();
  if (!StringUtils.isValidUrl(baseURL)) {
    throw new Error('Base url is not valid');
  }

  const axiosInstance = axios.create({
    baseURL,
  });

  // Adding gzip compression headers to improve network performance
  axiosInstance.defaults.headers.get['Accept-Encoding'] = 'gzip, deflate' ;
  axiosInstance.defaults.headers.post['Accept-Encoding'] = 'gzip, deflate' ;

  // Add Request & Response Interceptors
  // see: https://interglobalmedia.gitbooks.io/react-notes/adding-interceptors-to-execute-code-globally.html?q=
  const apiInterceptor = apiClient.getInterceptor();
  if (apiInterceptor) {
    const requestInterceptor = apiInterceptor.request(apiClient);
    const responseInterceptor = apiInterceptor.response(apiClient);
    axiosInstance.interceptors.request.use(requestInterceptor.onFulfilled, requestInterceptor.onRejected);
    axiosInstance.interceptors.response.use(responseInterceptor.onFulfilled, responseInterceptor.onRejected);
  }

  return axiosInstance;
};

export class ApiClient implements IApiClient {
  private readonly baseUrl: string;
  private readonly requestTimeout: number;
  private readonly interceptor?: IApiInterceptor;
  private readonly responseHandler?: IApiResponseHandler;
  private readonly defaultHandler?: IApiResponseHandler;
  private readonly useDefaultHandler: boolean = true;
  private authHelper?: IAuthHelper;
  private client: AxiosInstance;

  constructor(config: IApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.requestTimeout = config.requestTimeout || DEFAULT_API_TIMEOUT;
    this.interceptor = config.interceptor || undefined;
    this.responseHandler = config.responseHandler || undefined;
    if (config.useDefaultHandler !== undefined) {
      this.useDefaultHandler = config.useDefaultHandler;
    }
    if (this.useDefaultHandler) {
      this.defaultHandler = new ApiResponseHandler();
    }

    this.client = createClient(this);
  }

  public request = (config: AxiosRequestConfig, options: IApiClientOptions = {apiName: ''}): Promise<any> => {
    return this.client
      .request(config)
      .then((response: AxiosResponse) => {
        return Promise.resolve(this.handleSuccess({
          ...response,
          config: {...response.config, options},
        } as IApiResponse));
      }, (error: AxiosError) => {
        return Promise.reject(this.handleError({...error, config: {...error.config, options}} as IApiError));
      });
  }

  public handleSuccess = (apiResponse: IApiResponse<any>): any => {
    let response = apiResponse;
    if (this.defaultHandler && this.defaultHandler.success) {
      response = this.defaultHandler.success(response);
    }

    if (this.responseHandler && this.responseHandler.success) {
      response = this.responseHandler.success(response);
    }
    return isEmpty(response) ? apiResponse : response;
  }

  public handleError = (apiError: IApiError): any => {
    let error = apiError;
    if (this.defaultHandler && this.defaultHandler.error) {
      error = this.defaultHandler.error(error);
    }

    if (this.responseHandler && this.responseHandler.error) {
      error = this.responseHandler.error(error);
    }

    return error;
  }

  public get = (url: string, params?: {}, options?: IApiClientOptions): Promise<any> => {
    return this.request({
      // @ts-ignore
      method: HttpMethod.GET,
      url,
      params,
    }, options);
  }

  public post = (url: string, data?: {}, params?: {}, options?: IApiClientOptions): Promise<any> => {
    return this.request({
      // @ts-ignore
      method: HttpMethod.POST,
      url,
      data,
      params,
    }, options);
  }

  public put = (url: string, data?: {}, params?: {}, options?: IApiClientOptions): Promise<any> => {
    return this.request({
      // @ts-ignore
      method: HttpMethod.PUT,
      url,
      data,
    }, options);
  }

  public patch = (url: string, data?: {}, params?: {}, options?: IApiClientOptions): Promise<any> => {
    return this.request({
      // @ts-ignore
      method: HttpMethod.PATCH,
      url,
      data,
      params,
    }, options);
  }

  public delete = (url: string, params?: {}, options?: IApiClientOptions): Promise<any> => {
    return this.request({
      // @ts-ignore
      method: HttpMethod.DELETE,
      url,
      params,
    }, options);
  }

  public getBaseUrl = (): string => {
    return this.baseUrl;
  }

  public getRequestTimeout = (): number => {
    return this.requestTimeout;
  }

  public getInterceptor = (): IApiInterceptor | undefined => {
    return this.interceptor;
  }

  public setAuthHelper = (authHelper: IAuthHelper) => {
    this.authHelper = authHelper;
  }

  public getAuthHelper = (): IAuthHelper | undefined => {
    return this.authHelper;
  }
}
