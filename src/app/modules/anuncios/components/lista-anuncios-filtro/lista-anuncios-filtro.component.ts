import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { IAnuncio } from 'src/app/interfaces/IAnuncio';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'lista-anuncios-filtro',
  templateUrl: './lista-anuncios-filtro.component.html',
  styleUrls: ['./lista-anuncios-filtro.component.scss']
})
export class ListaAnunciosFiltroComponent implements OnInit {
  listaAnuncios: IAnuncio[] = [];

  constructor(
    private anunciosService: AnunciosService,
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => params.pesquisa),//pega o parametro que vc quer
        switchMap(pesquisa => this.anunciosService.listarAnunciosFiltrados(pesquisa))//retorna o observavel
      )
      .subscribe(anuncios => {
        if (anuncios.length === 0) {
          this.dialog.openDialog(
            {
              titulo: 'Nenhum resultado',
              mensagem: 'Não existem veículos para o filtro informado.',
              botaoText: 'Fechar'
            }
          );
          this.router.navigate(['home']);
          return;
        }
        this.listaAnuncios = anuncios;
      },
        () => {
          this.dialog.openDialog(
            {
              titulo: 'Houve um erro',
              mensagem: 'Desculpe por favor tente novamente.',
              botaoText: 'Fechar'
            }
          );
          this.router.navigate(['home']);
        }
      );
  }
}
