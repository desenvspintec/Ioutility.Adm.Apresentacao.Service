import { CnHelper } from './cn-helper';

describe('CnHelper', () => {
  it('1 - EstaNuloVazioOuUndefined deve exibir valores no console em modo debug', () => {
    CnHelper.estaNuloVazioOuUndefined([], true);
    expect(true).toEqual(CnHelper.consoleLogado);
  });
});
