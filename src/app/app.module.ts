import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment.prod';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MachineListComponent } from './components/machine-list/machine-list.component';
import { MachineService } from './services/machine.service';


@NgModule({
  declarations: [
    AppComponent,
    MachineListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'ae-hardware-manager'),
    AngularFirestoreModule
  ],
  providers: [MachineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
