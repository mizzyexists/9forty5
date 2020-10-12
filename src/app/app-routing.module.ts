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
import { AuthGuard } from './guards/auth.guard';
import { PlaycallerComponent } from './pages/userops/playcaller/playcaller.component';
import { EditprofileComponent } from './pages/userops/editprofile/editprofile.component';
import { DirectoryComponent } from './pages/directory/directory.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', redirectTo: '' },
  { path: 'user/:slug', component: ProfileComponent},
  { path: 'directory', component: DirectoryComponent },
  { path: 'edituser', redirectTo: '' },
  { path: 'edituser/:slug', component: EditprofileComponent},
  { path: 'playcaller', redirectTo: 'gainzone' },
  { path: 'playcaller/:slug', component: PlaycallerComponent},
  { path: 'adminmenu', component: AdminmenuComponent, canActivate: [AuthGuard]},
  { path: 'gainzone', component: GainzoneComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
