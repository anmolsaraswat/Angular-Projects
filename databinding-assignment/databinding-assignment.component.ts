import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-databinding-assignment',
  templateUrl: './databinding-assignment.component.html',
})
export class DatabindingAssignmentComponent implements OnInit {
  userName = '';
  constructor() { }

  ngOnInit(): void {
  }
  onClickOfButton()
  {
    this.userName = '';
  }

}
