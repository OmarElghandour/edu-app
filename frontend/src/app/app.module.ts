import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { SubscriberComponent } from './components/subscriber/subscriber.component';
import { OpentokService } from './opentok.service';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AppRoutingModule} from "./app.routing";
import { HeaderComponent } from './components/header/header.component';
import { TeachersListingComponent } from './components/teachers-listing/teachers-listing.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    SubscriberComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    TeachersListingComponent,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule
    ],
  providers: [OpentokService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
