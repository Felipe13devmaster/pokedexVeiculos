import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IAnuncio } from '../interfaces/IAnuncio';
import { ICredenciaisDeAcesso } from '../interfaces/ICredenciaisDeAcesso';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAnuncios(): Observable<IAnuncio[]>{
    return this.http.get<IAnuncio[]>('https://pokedex-veiculos-development.herokuapp.com/anuncios');
  }

  postLogin(credenciais: ICredenciaisDeAcesso): Observable<string>{
    return this.http.post<string>('https://pokedex-veiculos.herokuapp.com/auth', credenciais);
  }
}
