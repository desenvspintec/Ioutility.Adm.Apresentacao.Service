import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CnFundoParaSobreposicaoService {

  visivel = false;
  constructor() { }

  exibir(): void {
    this.visivel = true;
  }
  fechar(): void {
    this.visivel = false;
  }
}
