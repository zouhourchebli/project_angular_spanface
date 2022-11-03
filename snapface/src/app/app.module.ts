import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { registerLocaleData} from '@angular/common';
//import * as fr from '@angular/common/locales/fr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageModule } from './auth-page/auth-page.module';
/* import { FaceSnapComponent } from './face-snap/face-snap.component';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component'; */
//import { HeaderComponent } from './core/components/header/header.component';
//import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
//import { FormsModule} from '@angular/forms';
//import { NewFaceSnapComponent } from './new-face-snap/new-face-snap.component';
//import { HttpClientModule } from '@angular/common/http';
//import { httpInterceptorProvider } from './interceptors';
//import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap.component';
import { CoreModule } from './core/core.module';
//import { FaceSnapsModule } from './face-snaps/face-snaps.module';
import { LandingPageModule } from './landing-page/landing-page.module';




@NgModule({
  declarations: [
    AppComponent,

/*     FaceSnapComponent,
    FaceSnapListComponent, */
    //HeaderComponent,
    //LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FormsModule,
   // ReactiveFormsModule,
    //HttpClientModule,
    CoreModule,
   // FaceSnapsModule,
    LandingPageModule,
    AuthPageModule
  ],
/*   providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    httpInterceptorProvider
 
    Un provider est un objet que l'on déclare à Angular pour qu'il puisse l'injecter à différentes endroits de l'application.
    D'ailleurs, même si vos services ne figurent pas ici, ce sont des providers également ! Ils sont déclarés avec  @Injectable()  
    et Angular peut ensuite les injecter là où vous en avez besoin, comme via le constructor de vos components, par exemple. 
  ], */
  bootstrap: [AppComponent]
})
export class AppModule { 
  /* constructor() {
    registerLocaleData(fr.default);
  } */
}
