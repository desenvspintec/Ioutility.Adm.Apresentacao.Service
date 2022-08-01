import { CnCampoDetalhe } from 'src/app/shared/cn-components/model/cn-campo-detalhe';
import { ANIMAR_ENTRADA } from './../../constants/animacoes.constant';
import { CnSessaoGrupoCamposDetalhe } from './models/cn-sessao-grupo-campos-detalhe';
import { Component } from '@angular/core';

import { IEntityBasica } from '../../models/entity-basica';
import { IDrawerComponent } from '../../interfaces/i-drawer-compoent';
import { CnDetalheModel } from './models/cn-detalhe-model';

@Component({
  selector: 'app-cn-detalhes',
  templateUrl: './cn-detalhes.component.html',
  styleUrls: ['./cn-detalhes.component.scss'],
  animations: ANIMAR_ENTRADA
})
export class CnDetalhesComponent implements IDrawerComponent {

  model!: CnDetalheModel;
  entity: any;
  sessoesAbertas: string[] = [];

  aoIniciar(model: any): void {
    this.model = model;
    this.model.buscarPorIdDelegate(this.model.entityId).subscribe({
      next: result => this.entity = result as IEntityBasica
    });

  }

  ngOnInit(): void {
  }

  sessaoEstaAberta(sessao: CnSessaoGrupoCamposDetalhe): boolean {
    return this.sessoesAbertas.some(sessaoAberta => sessaoAberta === sessao.nome);
  }

  sessaoToggle(sessao: CnSessaoGrupoCamposDetalhe): void {
    if (this.sessaoEstaAberta(sessao))
      this._fecharSessao(sessao);
    else
      this._abrirSessao(sessao);
  }
  private _fecharSessao(sessao: CnSessaoGrupoCamposDetalhe) {
    this.sessoesAbertas = this.sessoesAbertas.filter(sessaoAberta => sessaoAberta !== sessao.nome);
  }

  private _abrirSessao(sessao: CnSessaoGrupoCamposDetalhe) {
    this.sessoesAbertas.push(sessao.nome);
  }

  exibirValorCampo(entity: any, campo: CnCampoDetalhe): string {
    if (campo.propriedade.includes('.')) {
      return this._obterValueObject(campo, entity);
    }

    return entity[campo.propriedade];
  }

  private _obterValueObject(campo: CnCampoDetalhe, entity: any): any {
    const propriedades = campo.propriedade.split('.');
    let ultimaPropriedade = entity;
    propriedades.forEach(propriedade => {
      ultimaPropriedade = ultimaPropriedade[propriedade];
    })
    return ultimaPropriedade;
  }
  obterEntitysRepetir(entity: any, nomeEntityRepetir: string): any[] {
    return entity[nomeEntityRepetir];
  }
  possuiApenasUmaSessao(): boolean {
    return this.model.sessoesGrupoCamposDetalhe.length === 1;
  }
}
