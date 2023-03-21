import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTablaComponent } from './administrador-tabla.component';

describe('AdministradorTablaComponent', () => {
  let component: AdministradorTablaComponent;
  let fixture: ComponentFixture<AdministradorTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
