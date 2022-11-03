import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { httpInterceptorProvider } from './interceptors';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    httpInterceptorProvider
  ]
})
export class CoreModule { 
  constructor() {
    registerLocaleData(fr.default);
}
}

/* 
Cette commande génère un dossier core avec un fichier  core.module.ts  .  
Ce fichier contient la configuration par défaut d'un module Angular, donc jetons-y un oeil : */