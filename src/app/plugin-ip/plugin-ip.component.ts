import { Component } from '@angular/core';
import {Ip2Country} from "../ip2country";
import {IpServiceService} from "../ip-service.service";

import {PluginTemplateComponent} from '../plugin-template/plugin-template.component'
import {Observable} from "rxjs/Observable";
import {ChatHandlerService} from "../chat-handler.service";

@Component({
  selector: 'app-plugin-ip',
  templateUrl: './plugin-ip.component.html',
  styleUrls: ['./plugin-ip.component.css']
})
export class PluginIpComponent extends PluginTemplateComponent {

  constructor(private ipService : IpServiceService, private chatService : ChatHandlerService) {
    super()
  }

  private write: string;

  process(command: string, value: string, author: string) {
    if (command == "ip") {

      this.write = `IP_ko command : "${value}" [${author}]`;

      let myIp : Observable<Ip2Country> = this.ipService.findIpInfo(value);
      myIp.subscribe(
        ip => {
          this.write = `ip command for ${value} : "${ip.country_code} ${ip.country_name} ${ip.ip}" [${author}]`;
          this.intercept();
        }
      );

    } else if ( command == "country" ) {

      if ( this.chatService.isMe(value) ) {

        let myIpCommand = ``;
        this.ipService.findIpInfo(myIpCommand).subscribe(ip => {
          let myCountryStr : string = `my[${value}] country is : ${ip.country_name}`;
          this.chatService.send(myCountryStr);
        });
      }
      this.discardMessage();
    } else {
      return;
    }
  }
}
