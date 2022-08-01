import { CnHelperTest } from './cn-helper-test';

describe('CnHelperTest', () => {
  it('1 - EstaNuloVazioOuUndefined deve exibir valores no console em modo debug', () => {
    expect(() => CnHelperTest.buscarEntitysBasicaComErroTest('teste', 0)).toThrowError();
  });
});
