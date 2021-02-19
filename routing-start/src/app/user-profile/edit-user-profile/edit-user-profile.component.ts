import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  a = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.a =this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params) => {
        this.a= params['id'];
      }
    )
  };

}
