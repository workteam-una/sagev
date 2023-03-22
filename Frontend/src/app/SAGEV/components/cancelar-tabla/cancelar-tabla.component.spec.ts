import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarTablaComponent } from './cancelar-tabla.component';

describe('CancelarTablaComponent', () => {
  let component: CancelarTablaComponent;
  let fixture: ComponentFixture<CancelarTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelarTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
