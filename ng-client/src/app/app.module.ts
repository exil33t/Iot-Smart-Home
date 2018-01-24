import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import {AngularFirestore, AngularFirestoreModule} from "angularfire2/firestore";
import {FirebaseService} from "./services/firebase.service";
import { NodesComponent } from './components/nodes/nodes.component';
import { ControlComponent } from './components/control/control.component';
import { RegisterNodeComponent } from './components/register-node/register-node.component';

import { FormsModule } from '@angular/forms';
import { ReportsComponent } from './components/reports/reports.component';
import {HttpService} from "./services/http.service";
import { HttpClientModule  } from '@angular/common/http';
import { HttpModule } from '@angular/http'





const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'control',
    component: ControlComponent
  },
  {
    path: 'nodes',
    component: NodesComponent
  },
  {
    path: 'nodes/add',
    component: RegisterNodeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NodesComponent,
    ControlComponent,
    RegisterNodeComponent,
    ReportsComponent,
  ],
  imports: [
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'app-name'),
    AngularFirestoreModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
  ],
  providers: [FirebaseService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
