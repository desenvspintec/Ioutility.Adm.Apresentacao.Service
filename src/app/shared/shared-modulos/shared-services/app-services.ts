import { CnServices } from './cn-services.constant';
import { ExternosServices } from './externos-services.constant';
export class AppServices {
  static obterTodos(): any[] {
    let todosServices: any[] = [];
    todosServices = todosServices.concat(CnServices);
    todosServices = todosServices.concat(ExternosServices);
    return todosServices;
  }
}
