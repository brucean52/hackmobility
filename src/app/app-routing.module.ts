import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [AuthGuard],
    component: MainComponent
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { 
    path: 'main', 
    canActivate: [AuthGuard],
    component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
