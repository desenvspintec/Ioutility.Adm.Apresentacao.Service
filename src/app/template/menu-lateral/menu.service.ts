import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _estaAberto = true;
  get estaAberto(): boolean {
    return this._estaAberto;
  }

  get estaFechado(): boolean {
    return !this._estaAberto;
  }

  get podeExibir(): boolean {
    return true;
  }

  constructor() { }

  abrir(): void {
    this._estaAberto = true;
  }

  fechar(): void {
    this._estaAberto = false;
  }

  toggle(): void {
    this._estaAberto = !this._estaAberto;
  }
}
