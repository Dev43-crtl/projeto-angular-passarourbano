import { Component, OnInit } from '@angular/core';

import { OfertaService } from '../ofertas.service';
import { Ofertas } from '../shared/ofertas.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertaService]
})
export class RestaurantesComponent implements OnInit {

  public restaurantes: Ofertas[]

  constructor(private ofertasService: OfertaService) { }

  ngOnInit(): void {

    this.ofertasService.getCategoria('restaurante').subscribe((restaurantes) => {
      this.restaurantes = restaurantes
    })

  }

}
