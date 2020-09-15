import { Component, OnInit } from '@angular/core';
import {interval, Subscription} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'assignment1';
  private firstObsSubscription : Subscription;

  ngOnInit(){
    this.firstObsSubscription = interval(1000).subscribe(count =>{
      console.log(count);
    })
  }
  stopObservable()
  {
    this.firstObsSubscription.unsubscribe();
  }
}