import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'rxjs';
import { ReservaComponent } from './reserva.component';
import { RouterTestingModule } from '@angular/router/testing';

// describe('ReservaComponent', () => {
//   let component: ReservaComponent;
//   let fixture: ComponentFixture<ReservaComponent>;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ReservaComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ReservaComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('ReservaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [RouterTestingModule],
      declarations: [ReservaComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ReservaComponent);
    const reserva = fixture.componentInstance;
    expect(reserva).toBeTruthy;
  });

  // it('should render the Funcionario name with the value "Ing Randall Madrigal Ledezma"', () => {
  //   const fixture = TestBed.createComponent(ReservaComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;

  //   expect(
  //     compiled.querySelector('.liNombreFuncionario').textContent
  //   ).toContain('Ing Randall Madrigal Ledezma');
  // });

  // it('should render the Funcionario name with the value "Ing Randall Madrigal Ledezma"', () => {
  //   const fixture = TestBed.createComponent(ReservaComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;

  //   const departamento = compiled.querySelector('.cbDpto').textConent;
  //   console.log('---------------------->');
    
  //   console.log(departamento);
     
  //   if(compiled.querySelector('.cbDpto').textConent === 'Bienes inmuebl')
  //   expect(
  //     compiled.querySelector('.cbDpto').textContent
  //   ).toContain('Bienes inmueble');
  // });


});
