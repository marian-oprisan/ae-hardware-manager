import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment.prod';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MachineListComponent } from './components/machine-list/machine-list.component';
import { MachineService } from './services/machine.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddMachineComponent } from './components/add-machine/add-machine.component';
import { FormsModule } from '@angular/forms';
import { ViewService } from './services/view.service';

@NgModule({
  declarations: [
    AppComponent,
    MachineListComponent,
    NavbarComponent,
    AddMachineComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'ae-hardware-manager'),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [MachineService, ViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
