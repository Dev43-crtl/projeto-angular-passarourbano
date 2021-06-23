import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../ofertas.service';
import { Ofertas } from '../shared/ofertas.model';
import { TopComponent } from '../top/top.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertaService, TopComponent]
})
export class HomeComponent implements OnInit {

  ofertas: Ofertas[]

  constructor(private ofertasService: OfertaService) { }

  ngOnInit(): void {

    this.ofertasService.getOfertas().subscribe((ofertas) => {
      this.ofertas = ofertas
    })


    
  }

 



}
