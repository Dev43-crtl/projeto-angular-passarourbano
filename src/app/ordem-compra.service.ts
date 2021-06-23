import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Ordem } from "./shared/ordem.model"

@Injectable()
export class OrdemCompraService{

    api_url = "http://localhost:3000"

    constructor( private http: HttpClient){}

    public efetivarCompra(ordem : Ordem): Observable<any>{

        let headers = new HttpHeaders()
        headers.append('Content-type', 'application/json')

        return this.http.post(`${this.api_url}/pedidos`, ordem, { headers : headers})
    }
}