import { IComponentModelService } from './i-component-model-service';
import { ICrudService } from './i-crud-service';
export interface IComponentService extends ICrudService, IComponentModelService {}
