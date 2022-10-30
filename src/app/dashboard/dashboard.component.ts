import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Database, getDatabase, ref, set } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { onValue } from '@firebase/database';
import { collection } from 'firebase/firestore';
import { ElementDialogComponent } from '../shared/element-dialog/element-dialog.component';
import { MoviesService } from '../shared/movies.service';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';

// export interface MovieElement{
//   titulo?: number ,
//   lancamento?: string,
//   genero?: string,
//   diretor?: string,
//   atores?: string,
//   key?: string,
// }

export interface MovieElement {
  "adult": boolean;
  "backdrop_path": string;
  "genre": string
  "id": number
  "original_language": string
  "original_title": string
  "overview": string
  "popularity": number
  "poster_path"?: string
  "release_date": string
  "title": string
  "video": boolean
  "vote_average": number
  "vote_count": number
  "atores": string
  "diretor": string
  "img_path": string
}


export const list_filmes: any = [
      {
        "adult": false,
        "backdrop_path": "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
        "id": 238,
        "original_language": "en",
        "original_title": "The Godfather",
        "overview": "Em 1945, Don Corleone é o chefe de uma mafiosa família italiana de Nova York. Ele costuma apadrinhar várias pessoas, realizando importantes favores para elas, em troca de favores futuros. Com a chegada das drogas, as famílias começam uma disputa pelo promissor mercado. Quando Corleone se recusa a facilitar a entrada dos narcóticos na cidade, não oferecendo ajuda política e policial, sua família começa a sofrer atentados para que mudem de posição. É nessa complicada época que Michael, um herói de guerra nunca envolvido nos negócios da família, vê a necessidade de proteger o seu pai e tudo o que ele construiu ao longo dos anos.",
        "popularity": 100.683,
        "poster_path": "/oJagOzBu9Rdd9BrciseCm3U3MCU.jpg",
        "release_date": "1972-03-14",
        "title": "O Poderoso Chefão",
        "video": false,
        "vote_average": 8.7,
        "vote_count": 16819
      },
      {
        "adult": false,
        "backdrop_path": "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
        "id": 496243,
        "original_language": "ko",
        "original_title": "기생충",
        "overview": "Toda a família de Ki-taek está desempregada, vivendo num porão sujo e apertado. Uma obra do acaso faz com que o filho adolescente da família comece a dar aulas de inglês à garota de uma família rica. Fascinados com a vida luxuosa destas pessoas, pai, mãe, filho e filha bolam um plano para se infiltrarem também na família burguesa, um a um. No entanto, os segredos e mentiras necessários à ascensão social custarão caro a todos.",
        "popularity": 71.995,
        "poster_path": "/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg",
        "release_date": "2019-05-30",
        "title": "Parasita",
        "video": false,
        "vote_average": 8.5,
        "vote_count": 14612
      },
      {
        "adult": false,
        "backdrop_path": "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
        "id": 155,
        "original_language": "en",
        "original_title": "The Dark Knight",
        "overview": "Após dois anos desde o surgimento do Batman, os criminosos de Gotham City têm muito o que temer. Com a ajuda do tenente James Gordon e do promotor público Harvey Dent, Batman luta contra o crime organizado. Acuados com o combate, os chefes do crime aceitam a proposta feita pelo Coringa e o contratam para combater o Homem-Morcego.",
        "popularity": 79.676,
        "poster_path": "/iGZX91hIqM9Uu0KGhd4MUaJ0Rtm.jpg",
        "release_date": "2008-07-14",
        "title": "Batman: O Cavaleiro das Trevas",
        "video": false,
        "vote_average": 8.5,
        "vote_count": 28479
      },
      {
        "adult": false,
        "backdrop_path": "/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg",
        "id": 122,
        "original_language": "en",
        "original_title": "The Lord of the Rings: The Return of the King",
        "overview": "O confronto final entre as forças do bem e do mal que lutam pelo controle do futuro da Terra Média se aproxima. Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf e Pippin partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso, Frodo, Sam e Gollum seguem sua viagem rumo à Montanha da Perdição para destruir o anel.",
        "popularity": 130.447,
        "poster_path": "/izPNMzffsgZUvlbiYlPxjFr3TAa.jpg",
        "release_date": "2003-12-01",
        "title": "O Senhor dos Anéis: O Retorno do Rei",
        "video": false,
        "vote_average": 8.5,
        "vote_count": 20429
      }

]


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  faTrashCan = faTrashCan;
  faEdit= faEdit;
  filme: any;
  filmes = list_filmes;


  constructor(
    private moviesService: MoviesService,
    public dialog: MatDialog,
    private router: Router,
    public database: Database,
    private angularFireAuth: AngularFireAuth,
    ) { }

    isLoggedIn: boolean = false;

  ngOnInit(): void {
      this.angularFireAuth.authState.subscribe(user=>{
        this.isLoggedIn = !!user;
      });

      const databaseRef = ref(this.database, 'filmes')
      onValue(databaseRef, (snapshot)=> {
        snapshot.val()
      })

      this.moviesService.topRatedMovies()
      .then(filmes=> console.log(filmes))

  }

  listarFilmes(){
    this.moviesService.topRatedMovies()
    .then(filmes=> {
      this.filmes = filmes;
    })
  }

  logout(){
    this.angularFireAuth.signOut();
    this.router.navigate(['/login'])
  }

  openDialog(filme: MovieElement | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '600px',
      data: filme === null ? {
        title: '',
        lancamento: '',
        genero: '',
        diretor: '',
        atores: '',
        overview: ''
      }: {
        title: filme.title,
        lancamento: filme.release_date,
        genero: filme.genre,
        diretor: filme.diretor,
        atores: filme.atores,
        overview: filme.overview
      }
      ,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        if(this.filmes.map((filmes: { title: string; }) => filmes.title).includes(result.title)){
          this.filmes[result.title - 1] = result;
          console.log(this.filmes[result.title - 1])

        } else {
        const db = getDatabase();
        const filmesId = Date.now();
        set(ref(db, 'filmes/' + filmesId), {
          titulo: result.atores,
          lancamento: result.lancamento,
          genero: result.genero,
          diretor: result.diretor,
          atores: result.atores
        });
        this.filmes.push(result)
        console.log(this.filmes)
      }

      }
    });
  }

  deleteMovie(title: string): void{
    this.filmes = this.filmes.filter((filmes: { title: string; }) => filmes.title !== title)
  }
}
