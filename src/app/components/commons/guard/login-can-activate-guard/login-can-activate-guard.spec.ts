import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { LoginCanActivateGuard } from './login-can-activate-guard';

describe('LoginCanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [LoginCanActivateGuard]
    });
  });

  it('should ...', inject([LoginCanActivateGuard], (guard: LoginCanActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
