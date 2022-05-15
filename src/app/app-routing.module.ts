import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {DetailPageComponent} from "./Detail/detail-page/detail-page.component";

const routes: Routes = [
  {path: '', component: ContainerComponent},
  {path: 'detail-page/:id-user/:id-post', component: DetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
