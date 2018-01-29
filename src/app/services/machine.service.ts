import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Machine } from '../models/machine';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MachineService {

  machinesCollection: AngularFirestoreCollection<Machine>;
  machines: Observable<Machine[]>;
  machineDoc: AngularFirestoreDocument<Machine>;

  constructor(public afs: AngularFirestore) {
    this.machinesCollection = this.afs.collection('machines');

    // Using snapshot changes so we can have access to every machine's id
    this.machines = this.machinesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Machine;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getMachines() {
    return this.machines;
  }

  addMachine(machine: Machine) {
    this.machinesCollection.add(machine);
  }

  deleteMAchine(machine: Machine) {
    this.machineDoc = this.afs.doc(`machines/${machine.id}`);
    this.machineDoc.delete();
  }

  updateMachine(machine: Machine) {
    this.machineDoc = this.afs.doc(`machines/${machine.id}`);
    this.machineDoc.update(machine);
  }

}
