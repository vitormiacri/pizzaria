export interface LoadPizzaData {
  loadData(): Promise<LoadPizzaData.Model>;
}

export namespace LoadPizzaData {
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
