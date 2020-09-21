import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//Apollo Imports
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { TestdataComponent } from './components/testdata/testdata.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockHeadComponent } from './components/stock-head/stock-head.component';
import { ProfilenavComponent } from './components/header/profilenav/profilenav.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { IdeasComponent } from './pages/ideas/ideas.component';
import { LearnComponent } from './pages/learn/learn.component';
import { HotstocksComponent } from './pages/hotstocks/hotstocks.component';
import { RegisterComponent } from './pages/userops/register/register.component';
import { ToastsContainer } from './models/toast.component';
import { LoginComponent } from './pages/userops/login/login.component';
import { ProfileComponent } from './pages/userops/profile/profile.component';

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
    IdeasComponent,
    LearnComponent,
    HotstocksComponent,
    RegisterComponent,
    ToastsContainer,
    LoginComponent,
    ProfileComponent
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
    {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
