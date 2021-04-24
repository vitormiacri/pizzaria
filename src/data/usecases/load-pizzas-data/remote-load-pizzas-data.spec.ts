import { HttpClientSpy } from '@/data/protocols/test/mock-http';
import { RemoteLoadPizzasData } from '@/data/usecases/load-pizzas-data/remote-load-pizzas-data';

const makeSut = (url: string) => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadPizzasData(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};
describe('RemoteLoadPizzasData', () => {
  test('Should be call HttpClient with correct URL and Method', async () => {
    const url = 'any_url';
    const { sut, httpClientSpy } = makeSut(url);
    await sut.loadData();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });
});
