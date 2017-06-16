import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {PluginTemplateComponent} from "../plugin-template/plugin-template.component";
import {SunriseSunsetService} from "./sunrise-sunset.service";
import {SunriseSunset} from "./sunrise-sunset";
import {ChatHandlerService} from "../chat-handler.service";

@Component({
  selector: 'plugin-sunrise-sunset',
  templateUrl: './plugin-sunrise-sunset.component.html',
  styleUrls: ['./plugin-sunrise-sunset.component.css']
})
export class PluginSunriseSunsetComponent extends PluginTemplateComponent {

  private response:SunriseSunset = new SunriseSunset();
  private errorMessage;
  private city:string = '';
  private isReady:boolean = false;

  constructor(private sss: SunriseSunsetService, private chatService: ChatHandlerService) { super(); }

  private findCity (command):string {
    let start = command.indexOf(':');
    if (start != -1) {
        return command.substr(start + 1, command.length);
    }
    return '';
  };

  process(command: string, value: string, author: string) {
    this.isReady = false;

    if (command.substr(0, command.indexOf(':')) != "ss") {
      return;
    }

    this.city = this.findCity(command);
    this.sss.getSunriseSunset(this.city).subscribe(
      r => {
        this.response = r;
        this.isReady = true;
      },
      error =>  this.errorMessage = <any>error
    );
    this.intercept();
  }

  showInfo(attr: string, label:string) {
    let msg: string = '';
    switch(attr) {
      case 'day_length':
        msg = label + ' ' + this.response[attr];
            break;

      default:
        msg = label + ' ' + new DatePipe('en-US').transform(this.response[attr], 'dd.MM.yyyy HH:mm:ss');
            break;
    }
    this.chatService.send(msg);
  }

}
