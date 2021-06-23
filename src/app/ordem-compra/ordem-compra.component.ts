import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { OrdemCompraService } from '../ordem-compra.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Ordem } from '../shared/ordem.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number 
  public itensCarrinho : ItemCarrinho[]

  @ViewChild('formulario') public formulario: NgForm

  constructor(private ordemCompraService : OrdemCompraService, public carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.exibirItens()
  }


  public confirmarCompra(): void{

    if(this.formulario.invalid){

      let pedido : Ordem = new Ordem(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento,
      this.carrinhoService.exibirItens()
    )

    }else{

      if(this.carrinhoService.exibirItens().length === 0){
        alert('Você não selecionou nenhum item')
      }else{
        let pedido : Ordem = new Ordem(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.exibirItens()
        )
      this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido) => {
          this.idPedidoCompra = idPedido.id
          this.carrinhoService.limparCarrinho()
        })
      }
    }
          
  } 

  public retirar(item: ItemCarrinho): void{
    this.carrinhoService.removerQuantidade(item)
  }

  public adicionar(item: ItemCarrinho): void{
    this.carrinhoService.adicionarQuantidade(item)
  }

}
