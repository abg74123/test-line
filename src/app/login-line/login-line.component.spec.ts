import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLineComponent } from './login-line.component';

describe('LoginLineComponent', () => {
  let component: LoginLineComponent;
  let fixture: ComponentFixture<LoginLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
