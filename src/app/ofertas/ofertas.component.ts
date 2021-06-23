import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { OfertaService } from '../ofertas.service';
import { Ofertas } from '../shared/ofertas.model';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  providers: [ OfertaService ]
})
export class OfertasComponent implements OnInit {

  public oferta: Ofertas

  constructor(private ofertaService: OfertaService, private route: ActivatedRoute, private carrinhoService: CarrinhoService) { }

  ngOnInit(){
    
    this.route.params.subscribe((parm : Params) => {
      parm.id

      this.ofertaService.getOfertaId(parm.id).subscribe((ofertaId: Ofertas) => {
        this.oferta = ofertaId
        })

    })

    this.carrinhoService.exibirItens()

  }

  public adicionarItemCarrinho() : void{
    this.carrinhoService.incluirItem(this.oferta)
    this.carrinhoService.exibirItens()

  }

}
