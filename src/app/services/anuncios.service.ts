import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IAnuncio, INovoAnuncio } from '../interfaces/IAnuncio';
import { IMarca } from '../interfaces/IMarca';
import { DialogService } from './dialog.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  constructor(
    private httpService: HttpService,
    private router: Router,
    private dialog: DialogService
  ) { }

  listarAnuncios(): Observable<IAnuncio[]> {
    return this.httpService.getAnuncios();
  }

  listarMarcas(): Observable<IMarca[]> {
    return this.httpService.getMarcas();
  }

  adicionar(novoAnuncio: INovoAnuncio, imagemAnuncio: File): void {
    this.httpService.postNovoAnuncio(novoAnuncio).subscribe(() => {
      const formData = new FormData();
      formData.append('imagem', imagemAnuncio);
      this.httpService.postImagemNovoAnuncio(formData).subscribe(() => {
        this.router.navigate(['home']);
        this._exibirMensagemSucesso();
      },
        () => this._exibirMensagemErro()
      );
    },
      () => this._exibirMensagemErro()
    );
  };

  private _exibirMensagemSucesso(): void {
    this.dialog.openDialog(
      {
        titulo: 'Sucesso',
        mensagem: 'Anúncio adicionado.',
        botaoText: 'Ok'
      }
    );
  }

  private _exibirMensagemErro(): void {
    this.dialog.openDialog(
      {
        titulo: 'Erro',
        mensagem: 'Desculpe ocorreu um problema, tente novamente.',
        botaoText: 'Fechar'
      }
    );
  }
}
