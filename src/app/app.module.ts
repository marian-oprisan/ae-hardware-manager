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
import { FooterComponent } from './components/footer/footer.component';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/auth.service';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent,
    MachineListComponent,
    NavbarComponent,
    AddMachineComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'ae-hardware-manager'),
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [MachineService, ViewService, AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
