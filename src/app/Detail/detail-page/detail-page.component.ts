import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AltenHttpService} from "../../service/alten-http.service";
import {Post} from "../../interface/post.interface";
import {forkJoin, Observable} from "rxjs";
import {User} from "../../interface/user.interface";
import {Location} from '@angular/common'

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {

  public idUser: any;
  public idPost: any;
  private sub: any;
  public singlePost: any;
  public singleUser: any;

  constructor(private route: ActivatedRoute,
              private altenHttpService: AltenHttpService,
              private location: Location) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idUser = +params['id-user'];
      this.idPost = +params['id-post'];
    });

    this.requestDataFromMultipleSources().subscribe(respForkJoin => {
      this.singleUser = respForkJoin[0];
      this.singlePost = respForkJoin[1];
      this.singleUser = this.singleUser[0];
      this.singlePost = this.singlePost[0];
    });

  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    let singleUserResp = this.altenHttpService.getSingleUser(this.idUser);
    let singlePostResp = this.altenHttpService.getSinglePost(this.idPost);
    return forkJoin([singleUserResp, singlePostResp]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  backBtn() {
    this.location.back();
  }


}
