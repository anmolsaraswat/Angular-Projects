import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() eventTrigger = new EventEmitter<number>();
  count = 0;
  myref;
  constructor() { }

  ngOnInit(): void {
  }
  emitEvent()
  {
     this.myref = setInterval(
       () => {
         this.eventTrigger.emit(this.count++);
       }, 1000);
  }
  stopEvent()
  {
    clearInterval(this.myref);
  }
}
