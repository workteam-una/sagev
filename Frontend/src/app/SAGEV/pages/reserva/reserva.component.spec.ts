import { TestBed } from '@angular/core/testing';
import { ReservaComponent } from './reserva.component';

describe('ReservaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservaComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ReservaComponent);
    const reserva = fixture.componentInstance;
    expect(reserva).toBeTruthy;
  });
});
