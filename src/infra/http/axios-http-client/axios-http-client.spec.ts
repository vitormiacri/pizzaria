import { mockHttpRequest } from '@/data/test/mock-http';
import { mockAxios } from '@/infra/test/mock-axios';
import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method,
    });
  });
});
