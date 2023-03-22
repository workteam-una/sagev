import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancelar-tabla',
  templateUrl: './cancelar-tabla.component.html',
  styleUrls: ['./cancelar-tabla.component.css']
})
export class CancelarTablaComponent implements OnInit {

  formModal: any

  constructor() { }

  ngOnInit(): void {

    
  }

  openModal() {
    this.formModal.show();
   }

   showModal = -1;

   show(index){
    this.showModal = index;
  }

  close(){
    this.showModal = -1;
  }

}

