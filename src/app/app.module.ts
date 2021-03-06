import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderBy } from './pipes/orderby';
import { WatchlistResolver } from './resolvers/watchlist.resolver';
import { QuillModule } from 'ngx-quill'
import { RecaptchaModule } from 'ng-recaptcha';

//Apollo Imports
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { StockHeadComponent } from './components/stock-head/stock-head.component';
import { ProfilenavComponent } from './components/header/profilenav/profilenav.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LearnComponent } from './pages/learn/learn.component';
import { RegisterComponent } from './pages/userops/register/register.component';
import { ToastsContainer } from './models/toast.component';
import { LoginComponent } from './pages/userops/login/login.component';
import { ProfileComponent } from './pages/userops/profile/profile.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminmenuComponent } from './pages/adminmenu/adminmenu.component';
import { AlertComponent } from './components/alert/alert.component';
import { GainzoneComponent } from './pages/gainzone/gainzone.component';
import { PlaycallerComponent } from './pages/userops/playcaller/playcaller.component';
import { EditprofileComponent } from './pages/userops/editprofile/editprofile.component';
import { DirectoryComponent } from './pages/directory/directory.component';
import { ForgotpassComponent } from './pages/userops/forgotpass/forgotpass.component';
import { ChangepassComponent } from './pages/userops/changepass/changepass.component';
import { EditormenuComponent } from './pages/editormenu/editormenu.component';
import { PostComponent } from './pages/post/post.component';
import { CreatepostComponent } from './pages/editormenu/createpost/createpost.component';
import { AdminopspopupComponent } from './components/adminopspopup/adminopspopup.component';
import { EditpostComponent } from './pages/editormenu/editpost/editpost.component';
import { DiscordpopupComponent } from './components/discordpopup/discordpopup.component';

const uri = '';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StockHeadComponent,
    ProfilenavComponent,
    HomeComponent,
    AboutComponent,
    LearnComponent,
    RegisterComponent,
    ToastsContainer,
    LoginComponent,
    ProfileComponent,
    WatchlistComponent,
    OrderBy,
    HomeBannerComponent,
    FooterComponent,
    AdminmenuComponent,
    AlertComponent,
    GainzoneComponent,
    PlaycallerComponent,
    EditprofileComponent,
    DirectoryComponent,
    ForgotpassComponent,
    ChangepassComponent,
    EditormenuComponent,
    PostComponent,
    CreatepostComponent,
    AdminopspopupComponent,
    EditpostComponent,
    DiscordpopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RecaptchaModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
            [{ 'header': [2, 3, 4, 5, 6, false] }],
            // [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic', 'underline', 'strike', { 'color': [] }, { 'font': [] }],
            [{ 'align': [] }],
            ['blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'image', 'video']
        ],
      }
    })
  ],
  providers: [
    OrderBy,
    NgbDropdown,
    WatchlistResolver,
    {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
