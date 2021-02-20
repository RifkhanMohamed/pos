import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GetBranchesComponent } from './get-branches.component';

describe('GetBranchesComponent', () => {
  let component: GetBranchesComponent;
  let fixture: ComponentFixture<GetBranchesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
