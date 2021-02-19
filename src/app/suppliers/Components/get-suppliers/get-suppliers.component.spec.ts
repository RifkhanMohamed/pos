import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSuppliersComponent } from './get-suppliers.component';

describe('GetSuppliersComponent', () => {
  let component: GetSuppliersComponent;
  let fixture: ComponentFixture<GetSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
