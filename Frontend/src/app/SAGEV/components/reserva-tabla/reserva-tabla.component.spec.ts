import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaTablaComponent } from './reserva-tabla.component';

describe('ReservaTablaComponent', () => {
  let component: ReservaTablaComponent;
  let fixture: ComponentFixture<ReservaTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
