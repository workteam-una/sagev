import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasFuncionarioPopupComponent } from './citas-funcionario-popup.component';

describe('CitasFuncionarioPopupComponent', () => {
  let component: CitasFuncionarioPopupComponent;
  let fixture: ComponentFixture<CitasFuncionarioPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasFuncionarioPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasFuncionarioPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
