import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFuncionarioComponent } from './header-funcionario.component';

describe('HeaderFuncionarioComponent', () => {
  let component: HeaderFuncionarioComponent;
  let fixture: ComponentFixture<HeaderFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
