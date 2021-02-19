import { TestBed } from '@angular/core/testing';

import { NavBarServicesService } from './nav-bar-services.service';

describe('NavBarServicesService', () => {
  let service: NavBarServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavBarServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
