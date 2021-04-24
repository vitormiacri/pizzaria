import { HttpStatusCode } from '@/data/protocols/http/http-client';
import { HttpClientSpy } from '@/data/protocols/test/mock-http';
import { mockRemotePizzaDataModel } from '@/data/test/mock-pizza-data';
import { RemoteLoadPizzasData } from '@/data/usecases/load-pizzas-data/remote-load-pizzas-data';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import faker from 'faker';

type SutTypes = {
  sut: RemoteLoadPizzasData;
  httpClientSpy: HttpClientSpy<RemoteLoadPizzasData.Model>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadPizzasData(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadPizzasData', () => {
  test('Should be call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.loadData();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  test('Should throw UnexpectedError if HttpClient return 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.loadData();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a PizzaData if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const pizzaDataMock = mockRemotePizzaDataModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: pizzaDataMock,
    };
    const pizzasData = await sut.loadData();
    expect(pizzasData).toEqual(pizzaDataMock);
  });
});
