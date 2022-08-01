import { trigger, state, style, transition, animate } from '@angular/animations';
export const ESTADO_ANIMACAO = { aberto: 'show', fechado: 'hide' }
export const ANIMAR_ENTRADA = [
  trigger('animarCaindo', [
    state('void', style({
      opacity: -0,
      top: -4
    })),
    transition('void => *', animate(200)),
  ]),
  trigger('animarSubindo', [
    state('void', style({
      opacity: -0,
      top: 10
    })),
    transition('void => *', animate('300ms ease-out')),
  ]),
  trigger('animarVindoDaDireita', [
    state('void', style({
      opacity: 0,
      right: -100,
    })),
    transition('* => *', animate('300ms ease-out'))
  ])
];

export const ESTADO_MENU = {
  aberto: 'aberto',
  fechado: 'fechado'
}
export const ANIMAR_MENU = [
  trigger('menuToggle', [
    state('aberto', style({
      width: 90,
    })),
    state('fechado', style({
      width: 360,
    })),
    transition(ESTADO_MENU.aberto + ' => ' + ESTADO_MENU.fechado, animate('300ms ease-out')),
    transition(ESTADO_MENU.fechado + ' => ' + ESTADO_MENU.aberto, animate('300ms ease-out')),
  ]),
  trigger('conteudoToggle', [
    state('aberto', style({
      'padding-left': '95px'
    })),
    state('fechado', style({
      'padding-left': '360px'
    })),
    transition(ESTADO_MENU.aberto + ' => ' + ESTADO_MENU.fechado, animate('300ms ease-out')),
    transition(ESTADO_MENU.fechado + ' => ' + ESTADO_MENU.aberto, animate('300ms ease-out')),
  ]),
  trigger('componentesToggle', [
    state('aberto', style({
      visibility: 'hidden',
      'max-height': '0px'
    })),
    state('fechado', style({
      visibility: 'visible',
      'max-height': '80px'

    })),
    transition(ESTADO_MENU.aberto + ' => ' + ESTADO_MENU.fechado, animate('600ms ease-out')),
    transition(ESTADO_MENU.fechado + ' => ' + ESTADO_MENU.aberto, animate('600ms ease-out')),
  ])
]
