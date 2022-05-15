import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContainerComponent} from './container/container.component';
import {HttpClientModule} from "@angular/common/http";
import {AltenHttpService} from "./service/alten-http.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalPostComponent} from './shared/modal/modal-post/modal-post.component';
import {DetailPageComponent} from './Detail/detail-page/detail-page.component';
import {FilterByTextPipe} from "./shared/pipe/filterByTextPipe";
import {FormsModule} from "@angular/forms";
import { DetailSectionComponent } from './Detail/detail-section/detail-section/detail-section.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ModalPostComponent,
    DetailPageComponent,
    FilterByTextPipe,
    DetailSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [AltenHttpService],
  bootstrap: [AppComponent],
  entryComponents: [ModalPostComponent]
})
export class AppModule {
}
