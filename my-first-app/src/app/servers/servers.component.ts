import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html'
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverName = '';
  constructor() { 
    setTimeout(() => {
      this. allowNewServer = true;
    },2000)
  }

  ngOnInit(): void {
  }
  onUpdateServerName(event: any){
    console.log(event);
    this.serverName = event.target.value;
    console.log('Hello');
  }

}
