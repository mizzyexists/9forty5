import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LearnComponent } from './pages/learn/learn.component';
import { RegisterComponent } from './pages/userops/register/register.component';
import { LoginComponent } from './pages/userops/login/login.component';
import { ProfileComponent } from './pages/userops/profile/profile.component';
import { AdminmenuComponent } from './pages/adminmenu/adminmenu.component';
import { GainzoneComponent } from './pages/gainzone/gainzone.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', redirectTo: '' },
  { path: 'profile/:slug', component: ProfileComponent},
  { path: 'adminmenu', component: AdminmenuComponent},
  { path: 'gainzone', component: GainzoneComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
