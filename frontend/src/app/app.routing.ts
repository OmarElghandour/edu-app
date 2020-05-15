import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import { TeachersListingComponent } from './components/teachers-listing/teachers-listing.component';
import { RegisterComponent } from './components/register/register.component';
import { ListLivesComponent } from './components/list-lives/list-lives.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'lives', component: ListLivesComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'teachers', component: TeachersListingComponent },
    { path: 'login', component : LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
