import faker from 'faker';
import { RemoteLoadPizzasData } from '../usecases/load-pizzas-data/remote-load-pizzas-data';

export const mockRemotePizzaDataModel = (): RemoteLoadPizzasData.Model => ({
  sabores: [faker.random.word(), faker.random.word(), faker.random.word()],
  tamanhos: [faker.random.word(), faker.random.word(), faker.random.word()],
  massas: [faker.random.word(), faker.random.word(), faker.random.word()],
  ofertaDia: {
    pizza: {
      sabor: faker.random.word(),
      massa: faker.random.word(),
      tamanho: faker.random.word(),
    },
    pontos: faker.datatype.number(),
  },
});
