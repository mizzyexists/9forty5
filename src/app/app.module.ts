import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderBy } from './pipes/orderby';

//Apollo Imports
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { TestdataComponent } from './components/testdata/testdata.component';
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

const uri = 'https://api.mzydigital.com/v1/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    TestdataComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    OrderBy,
    NgbDropdown,
    {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
