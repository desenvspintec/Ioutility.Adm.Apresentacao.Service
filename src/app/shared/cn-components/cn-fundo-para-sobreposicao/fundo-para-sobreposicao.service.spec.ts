import { TestBed } from '@angular/core/testing';

import { CnFundoParaSobreposicaoService } from './cn-fundo-para-sobreposicao.service';

describe('FundoParaSobreposicaoService', () => {
  let service: CnFundoParaSobreposicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CnFundoParaSobreposicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
