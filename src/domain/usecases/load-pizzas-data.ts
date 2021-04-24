export interface LoadPizzaData {
  loadData(): Promise<LoadPizzaDataModel>;
}

export type LoadPizzaDataModel = {
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
