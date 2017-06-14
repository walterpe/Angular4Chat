import {Component, OnInit} from '@angular/core';

import {ChatHandlerService} from '../chat-handler.service'
import {Router} from "@angular/router";

@Component({
  templateUrl: './disconnected-view.component.html',
  styleUrls: ['./disconnected-view.component.css']
})
export class DisconnectedViewComponent implements OnInit {

  private name: string = '';

  constructor(private chatService: ChatHandlerService,
              private router: Router) {
  }

  ngOnInit() {
    this.chatService.connected().subscribe(connected => {
      if (connected) {
        this.router.navigate(['/chat']);
      }
    })
  }

  private connect() {
    if (!this.name) {
      return;
    }
    this.chatService.connect(this.name);
  }

}
