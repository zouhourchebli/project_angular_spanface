import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsServices } from 'src/app/core/services/face-snaps.services';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  //faceSnap!: FaceSnap;
  faceSnap$! : Observable<FaceSnap>;
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapsServices,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.buttonText = 'Oh Snap!';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

/*   onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
        this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').subscribe();
        this.buttonText = 'Oops, unSnap!';
    } else {
        this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').subscribe();
        this.buttonText = 'Oh Snap!';
    }
  } */

/*   Eh bien, c'est parce que ces requêtes restent asynchrones, même si elles sont quasiment instantanées avec le serveur qui tourne en local. 
  L'ordre de traitement des requêtes n'est donc pas assuré dans l'exemple ci-dessus.

  Pour vous assurer que le PUT soit traité avant de rappeler le GET, il faut de nouveau ajouter un  pipe()  : */

/*   onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
        this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
            tap(() => {
                this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
                this.buttonText = 'Oops, unSnap!';
            })
        ).subscribe();
    } else {
        this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
            tap(() => {
                this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
                this.buttonText = 'Oh Snap!';
            })
        ).subscribe();
    }
} */


/* Ici, vous profitez du fait que l'Observable du PUT émette au moment de la réponse positive du serveur, pour ajouter un  tap() 
qui vient renouveler la requête GET du FaceSnap simple et mettre à jour le texte du bouton !

On va même améliorer cette implémentation : puisque la requête PUT renvoie le FaceSnap modifié, on peut simplifier et faire : */

onSnap(faceSnapId: number) {
  if (this.buttonText === 'Oh Snap!') {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
          tap(() => this.buttonText = 'Oops, unSnap!')
      );
  } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
          tap(() => this.buttonText = 'Oh Snap!')
      );
  }
}


// Avec cette implémentation, il n'y a même pas besoin d'appeler  .subscribe()  car le pipe  async  du template souscrit pour nous !


}

