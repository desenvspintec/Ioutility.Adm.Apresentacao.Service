export class Entity implements IEntity {
  constructor(public id: string){}
}

export interface IEntity {
  id: string;
}
