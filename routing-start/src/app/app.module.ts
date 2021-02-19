import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {Routes, RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { EditUserProfileComponent } from './user-profile/edit-user-profile/edit-user-profile.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FormsModule } from '@angular/forms'
import { LoadingSpinnerComponent } from './Shared/LoadingSpinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component'
import { PlaceholderDirective } from './placeholder/placeholder.directive';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'productList', component: ProductListComponent},
  {path: 'UserProfile', component: UserProfileComponent, children:[
    {path: ':id', component: EditUserProfileComponent}
  ]},
  {path: 'about/:id/edit', component: AboutComponent},
  {path: 'auth', component: AuthenticationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    UserProfileComponent,
    AboutComponent,
    HomeComponent,
    EditUserProfileComponent,
    AuthenticationComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }
