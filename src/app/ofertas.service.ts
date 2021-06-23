import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Ofertas } from "./shared/ofertas.model";
import { Observable } from "rxjs";
import { retry } from 'rxjs/operators'


@Injectable()
export class OfertaService{

    constructor(public http: HttpClient){}

    api_url = "http://localhost:3000/ofertas"

    public getOfertas(): Observable<Ofertas[]>{
        return this.http.get<Ofertas[]>(`${this.api_url}`).pipe(retry(30))
    } 

    public getCategoria(categoria: string): Observable<Ofertas[]>{
        return this.http.get<Ofertas[]>(`${this.api_url}?categoria=${categoria}`).pipe(retry(30))
    }

    public getOfertaId(id: number): Observable<Ofertas>{
        return this.http.get<Ofertas>(`${this.api_url}/${id}`).pipe(retry(30))
    }

    public pesquisarOferta(termo: any): Observable<Ofertas[]>{
        return this.http.get<Ofertas[]>(`${this.api_url}?descricao_oferta_like=${termo}`)
    }

}