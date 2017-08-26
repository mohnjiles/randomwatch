import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { HeroService } from './hero-service/hero.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
