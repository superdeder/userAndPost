import {Component, OnInit} from '@angular/core';
import {AltenHttpService} from "../service/alten-http.service";
import {User} from "../interface/user.interface";
import {forkJoin, Observable} from "rxjs";
import {Post} from "../interface/post.interface";
import {Unique} from "../interface/unique.interface";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalPostComponent} from "../shared/modal/modal-post/modal-post.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  public usersList: User[] = [];
  public postsList: Post[] = [];
  public uniqueList: Unique[] = [];
  public colorSquare: string;
  public userDetail: any;
  public detailIsVisible: boolean = false;
  public namePost: string;


  constructor(private altenHttpService: AltenHttpService,
              private modalService: NgbModal,
              private router: Router) {
    this.colorSquare = '';
    this.namePost = '';
  }

  ngOnInit(): void {

    // Tramite la forkJoin aspetto che entrambi le chiamate vengano concluse.
    this.requestDataFromMultipleSources().subscribe(respForkJoin => {
      this.usersList = respForkJoin[0];
      this.postsList = respForkJoin[1];

    // Creo un unico oggetto per popolare il template
      this.usersList.forEach(value => {
        const count = this.postsList.filter((obj) => obj.userId === value.id);
        count.forEach((singleCount) => {
          const uniqueModel = {} as Unique;
          uniqueModel.id = singleCount.id;
          uniqueModel.userId = singleCount.userId
          uniqueModel.body = singleCount.body;
          uniqueModel.title = singleCount.title;
          uniqueModel.username = value.username;
          uniqueModel.name = value.name;
          this.uniqueList.push(uniqueModel);
        });
      });
    });

  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    let userListResp = this.altenHttpService.getUsersList();
    let postListResp = this.altenHttpService.getPostList();
    return forkJoin([userListResp, postListResp]);
  }

  // Funzione per iniziali da mettere nel quadrato rosso
  getShortName(fullName: string) {
    let sign: string;
    const nameSplit = fullName.split(' ').map((n: string) => n[0]).join('');
    sign = (nameSplit.length > 2) ? (nameSplit.substring(0, 2)) : nameSplit;
    return sign;
  }

  // Apertura modale di dettaglio al click sul quadrato rosso
  openModal(userComplete: Unique) {
    const modalRef = this.modalService.open(ModalPostComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass'
      });

    modalRef.componentInstance.userComplete = userComplete;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  // Gestione per eliminazione del post selezionato dalla lista
  public removeEl(indexUser: number) {
    this.uniqueList.splice(indexUser, 1);
    console.log(this.uniqueList);
  }

  // Redirect alla pagina di dettaglio del post selezionato
  goToDetailPage(idUser: number, idPost: number) {
    this.router.navigate(['/detail-page', idUser, idPost]);
  }

  // Funzione per cambio colore quadrato
  changeColor(color: string) {
    this.colorSquare = color;
  }

  // Funzione per l'apertura in top del dettaglio
  detailSectionfn(userComplete: Unique) {
    this.detailIsVisible = true
    this.userDetail = userComplete;
  }

  // Chiusura del dettaglio
  onCloseDetailEmit(booleanClose: boolean) {
    this.detailIsVisible = !booleanClose;
  }


}
