import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopWatchComponent } from './stop-watch/stop-watch.component';
import { HomeComponent } from './home/home.component';
import { TypeAheadWipComponent } from './type-ahead-wip/type-ahead-wip.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'demo1', component: StopWatchComponent },
  { path: 'demo2', component: TypeAheadWipComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
