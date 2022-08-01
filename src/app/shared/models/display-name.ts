export class DisplayName {

  constructor(public nomePropriedade: string, public  valorDisplay: string) {
  }

  nomePropriedadeTxt(): string {
    return this.nomePropriedade + 'Txt';
  }
}
