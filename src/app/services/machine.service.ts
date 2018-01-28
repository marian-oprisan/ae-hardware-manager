import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Machine } from '../models/machine';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MachineService {

  machinesCollection: AngularFirestoreCollection<Machine>;
  machines: Observable<Machine[]>;
  constructor(public afs: AngularFirestore) {
    this.machines = this.afs.collection('machines').valueChanges();
  }

  getMachines() {
    return this.machines;
  }
}
