import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormModalComponent } from './cn-form-modal.component';
import { CnSharedTestModule } from 'src/app/shared/shared-modulos/cn-shared-teste.module';

describe('CnFormModalComponent', () => {
  let component: CnFormModalComponent;
  let fixture: ComponentFixture<CnFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormModalComponent ],
      imports: [
        CnSharedTestModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
