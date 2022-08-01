import { Entity, IEntity } from './entity';

export class EntityBasica  extends Entity implements IEntityBasica{
  constructor(id: string, public nome: string) {
    super(id);
  }
}
export interface IEntityBasica extends IEntity {
  nome: string;
}
