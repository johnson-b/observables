import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StopWatchComponent } from './stop-watch/stop-watch.component';
import { HomeComponent } from './home/home.component';
import { TypeAheadWipComponent } from './type-ahead-wip/type-ahead-wip.component';
import { TypeAheadComponent } from './type-ahead/type-ahead.component';

@NgModule({
  declarations: [
    AppComponent,
    StopWatchComponent,
    HomeComponent,
    TypeAheadWipComponent,
    TypeAheadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
