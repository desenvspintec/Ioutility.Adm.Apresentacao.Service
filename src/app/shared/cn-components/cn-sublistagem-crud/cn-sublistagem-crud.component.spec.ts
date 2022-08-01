import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnSublistagemCrudComponent } from './cn-sublistagem-crud.component';

describe('CnSublistagemCrudComponent', () => {
  let component: CnSublistagemCrudComponent;
  let fixture: ComponentFixture<CnSublistagemCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnSublistagemCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnSublistagemCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
