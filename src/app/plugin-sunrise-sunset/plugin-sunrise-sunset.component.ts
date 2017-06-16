import { Component, OnInit } from '@angular/core';
import {PluginTemplateComponent} from "../plugin-template/plugin-template.component";
import {SunriseSunsetService} from "./sunrise-sunset.service";
import {SunriseSunset} from "./sunrise-sunset";

@Component({
  selector: 'plugin-sunrise-sunset',
  templateUrl: './plugin-sunrise-sunset.component.html',
  styleUrls: ['./plugin-sunrise-sunset.component.css']
})
export class PluginSunriseSunsetComponent extends PluginTemplateComponent {

  private response:SunriseSunset = new SunriseSunset();
  private errorMessage;

  constructor(private sss: SunriseSunsetService) { super(); }

  private city:string = '';
  private isReady:boolean = false;

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

}
