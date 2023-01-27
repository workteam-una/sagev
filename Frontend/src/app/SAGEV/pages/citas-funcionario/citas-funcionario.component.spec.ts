import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasFuncionarioComponent } from './citas-funcionario.component';

describe('CitasFuncionarioComponent', () => {
  let component: CitasFuncionarioComponent;
  let fixture: ComponentFixture<CitasFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
