import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../ofertas.service';
import { Ofertas } from '../shared/ofertas.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertaService]
})

export class DiversaoComponent implements OnInit {

  public diversao: Ofertas[]

  constructor(private ofertaService: OfertaService) { }

  ngOnInit(): void {

    this.ofertaService.getCategoria('diversao').subscribe((diversao: Ofertas[]) => {
      this.diversao = diversao
    })
  }
  
}