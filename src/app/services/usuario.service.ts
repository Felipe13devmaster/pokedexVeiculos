import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpService: HttpService) { }

  listarUsuarios(): Observable<IUsuario[]>{
    return this.httpService.getUsuarios();
  }

  adicionarNovoUsuario(novoUsuario: IUsuario){
    return this.httpService.postNovoUsuario(novoUsuario).subscribe(statusCode => {
      if(statusCode === 201) alert('Novo usuário adicionado com sucesso'); else alert('Erro ao adicionar novo usuário.');
    });
  }
}
