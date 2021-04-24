import { HttpClient } from '@/data/protocols/http/http-client';
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
    return Promise.resolve({
      sabores: [],
      tamanhos: [],
      massas: [],
      ofertaDia: {
        pizza: {
          sabor: '',
          massa: '',
          tamanho: '',
        },
        pontos: 0,
      },
    });
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
