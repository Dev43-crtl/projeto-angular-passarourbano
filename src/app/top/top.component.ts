import { Component, OnInit } from '@angular/core';

import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { OfertaService } from '../ofertas.service';
import { Ofertas } from '../shared/ofertas.model';
import { CarrinhoService } from '../carrinho.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
  providers: [OfertaService]
})

export class TopComponent implements OnInit {

  faShoppingCart = faShoppingCart
  public ofertas: Observable<Ofertas[]>


  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertaService: OfertaService, public carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    
    this.ofertas = this.subjectPesquisa.pipe(debounceTime(1000), //para executar o switchmap apos 1 segundo
    distinctUntilChanged(), //para fazer pesquisas distintas
    switchMap((termo) => {


      if(termo.trim() === ''){
        //return um array de ofertas vazio
        return of(<Ofertas[]>([]))
      }
      return this.ofertaService.pesquisarOferta(termo)
    })).pipe(catchError((err: any) => { 
      return of(<Ofertas[]>([])) 
    })
    )
  }

  public pesquisa(termo: string): void {
    this.subjectPesquisa.next(termo)
  }

  public limpaPesquisa():void {
    this.subjectPesquisa.next('')
  }

}
