import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateProductsComponent } from './create-products.component';

describe('CreateProductsComponent', () => {
  let component: CreateProductsComponent;
  let fixture: ComponentFixture<CreateProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
