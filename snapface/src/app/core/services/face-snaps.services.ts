import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsServices {

  constructor(private http: HttpClient) {}

  //faceSnaps: FaceSnap[] = [];

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

/*   getFaceSnapById(faceSnapId: number): FaceSnap {
    const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if (!faceSnap) {
      throw new Error('FaceSnap not found!');
    } else {
      return faceSnap;
    }
  } */
  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  // snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
  /*   const faceSnap = this.getFaceSnapById(faceSnapId);
    snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--; */
    // return this.getFaceSnapById(faceSnapId).pipe(
     /*  map(   // modifier l'émission
        faceSnap => ({    // recevoire le facesnpa et on a simplement retourne le facesnap a retourné
          ...faceSnap, // copier le contenu de facesnap
          snaps: faceSnap.snaps + snapType === 'snap' ? 1 : -1

        })
      ),
    )

  } */

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
        map(faceSnap => ({
            ...faceSnap,
            snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
        })),
        switchMap(updatedFaceSnap => this.http.put<FaceSnap>(  //recevoire le snap mise a jour
            `http://localhost:3000/facesnaps/${faceSnapId}`,
            updatedFaceSnap)
        )
    );
}

/*   addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string}): void {
    const faceSnap: FaceSnap = {
      ...formValue,
      createdDate: new Date(),
      snaps: 0,
      id: this.faceSnaps[this.faceSnaps.length - 1].id +1
    };
    this.faceSnaps.push(faceSnap);
  } */



/* Il est tout à fait possible d'effectuer ces trois étapes dans un seul opérateur. Je voulais simplement vous montrer 
la lisibilité qui peut être gagnée en séparant les étapes :

On retourne un tableau trié par ID pour s'assurer que le dernier élément du tableau possède l'ID le plus élevé.

On retourne ensuite le dernier élément de ce tableau.

On retourne le nouveau FaceSnap avec son ID valable.

Le dernier opérateur,  switchMap()  , génère la requête POST finale.


 */

  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map(faceSnaps => [...faceSnaps].sort((a: FaceSnap, b: FaceSnap) => a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length -1]),
      map(previousFacesnap => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFacesnap.id +1
      })),
      switchMap(newFacesnap => this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFacesnap))
    );
  }  

}
