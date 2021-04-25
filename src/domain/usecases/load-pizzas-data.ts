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
    pontos: string;
  };
};

export type OrderModel = {
  massa: string;
  sabor: string;
  tamanho: string;
  oferta: string;
  pontos: string;
};
