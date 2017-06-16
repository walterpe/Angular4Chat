import {Component, OnInit} from '@angular/core';

import {PluginTemplateComponent} from '../plugin-template/plugin-template.component'
import {ChatHandlerService} from '../chat-handler.service';

@Component({
  selector: 'plugin-bomb',
  templateUrl: './plugin-bomb.component.html',
  styleUrls: ['./plugin-bomb.component.css']
})
export class PluginBombComponent extends PluginTemplateComponent {

  write: string;

  constructor(private chatHandlerService: ChatHandlerService) {
    super()
  }

  process(command: string, value: string, author: string) {
    if (command !== 'bomb') {
      return;
    }
    this.discardMessage();
    this.chatHandlerService.messages.pop();
  }

}
