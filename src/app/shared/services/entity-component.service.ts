import { HttpClient } from '@angular/common/http';
import { EntityService } from 'src/app/shared/services/entity.service';

import { CnCrudModel } from '../cn-components/model/cn-crud-model';
import { IComponentService } from '../interfaces/i-component-service';
import { DisplayNameService } from './display-name.service';

export abstract class EntityCompoentService extends EntityService implements IComponentService{
  constructor(
    httpClient: HttpClient,
    protected displayNameService: DisplayNameService
  ) {
    super(httpClient, 'paciente');
  }
  abstract gerarModelComponent(): CnCrudModel;
}
