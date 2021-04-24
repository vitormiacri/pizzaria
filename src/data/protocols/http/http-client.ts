export enum HttpStatusCode {
  ok = 20,
  noContent = 204,
  unauthorized = 401,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';
