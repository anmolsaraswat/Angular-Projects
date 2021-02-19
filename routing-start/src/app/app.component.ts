import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isAuthenticated = false;
  title = 'routing-start';
  private userSub: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService){

  }
ngOnInit(){
  this.authService.autoLogin();
  console.log(this.route.queryParams);
  console.log(this.route.fragment);
  this.route.queryParams.subscribe();
  this.route.fragment.subscribe();


 this.userSub=  this.authService.user.subscribe(user => {
   this.isAuthenticated = !!user;
   console.log(!user);
   console.log(!!user);
 });
}
onLogout()
{
  this.authService.logOut();
}
  onclickofAbout(id: number){
    // complex logic after that we want to load the page
    // this.router.navigate(['/about'])
    this.router.navigate(['/about', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
    // console.log(this.route.queryParams);
    // console.log(this.route.fragment);
  }
}