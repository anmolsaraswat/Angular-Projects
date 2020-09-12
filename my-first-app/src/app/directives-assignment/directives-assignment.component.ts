import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives-assignment',
  templateUrl: './directives-assignment.component.html',
  styleUrls: ['./directives-assignment.component.css']
})
export class DirectivesAssignmentComponent implements OnInit {
  toggleDisplay = true;
  Array =[];
  count = 0;
  constructor() { }

  ngOnInit(): void {
  }
  onClickofButton(){
    this.Array.push(this.count ++);
    this.toggleDisplay = !this.toggleDisplay;
    console.log(this.Array.length);
  }
  getColor()
  {
    if(this.Array.length >5)
      return 'blue';
  }
}