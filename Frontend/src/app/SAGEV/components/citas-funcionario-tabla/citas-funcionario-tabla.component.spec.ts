import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasFuncionarioTablaComponent } from './citas-funcionario-tabla.component';

describe('CitasFuncionarioTablaComponent', () => {
  let component: CitasFuncionarioTablaComponent;
  let fixture: ComponentFixture<CitasFuncionarioTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasFuncionarioTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasFuncionarioTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
