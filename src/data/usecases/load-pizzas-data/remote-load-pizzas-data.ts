import { HttpClient, HttpStatusCode } from '@/data/protocols/http/http-client';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { LoadPizzaData } from '@/domain/usecases/load-pizzas-data';

export class RemoteLoadPizzasData implements LoadPizzaData {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadPizzasData.Model>
  ) {}

  async loadData(): Promise<RemoteLoadPizzasData.Model> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'get',
    });
    const remotePizzas = response.body;
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return remotePizzas;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadPizzasData {
  export type Model = {
    sabores: string[];
    tamanhos: string[];
    massas: string[];
    ofertaDia: {
      pizza: {
        sabor: string;
        massa: string;
        tamanho: string;
      };
      pontos: number;
    };
  };
}
