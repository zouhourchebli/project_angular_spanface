import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject} from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsServices } from 'src/app/core/services/face-snaps.services';


@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit {//, OnDestroy{ 

  faceSnaps!: FaceSnap[];
  //private destroy$!: Subject<boolean>;
  faceSnaps$! : Observable<FaceSnap[]>;

  constructor(private faceSnapsService: FaceSnapsServices) { }

  ngOnInit(): void {
/*     this.destroy$ = new Subject<boolean>();
    

    interval(1000).pipe(
      //take(3),
      takeUntil(this.destroy$),
      tap(console.log)
    ).subscribe();
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
  } */

     //this.faceSnaps = this.faceSnapsService.getAllFaceSnaps();
     this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();

  } 

}
