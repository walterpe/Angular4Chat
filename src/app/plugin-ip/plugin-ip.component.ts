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
    const firerPrefix = "_countryFirer";
    const withFirerCommand = "countryWithFirer";

    if (command == "ip") {

      this.write = `IP_ko command : "${value}" [${author}]`;

      let myIp : Observable<Ip2Country> = this.ipService.findIpInfo(value);
      myIp.subscribe(
        ip => {
          this.write = `ip command for ${value} : "${ip.country_code} ${ip.country_name} ${ip.ip}" [${author}]`;
          this.intercept();
        }
      );

    } else if ( command == withFirerCommand ) {

      const hasSpace = value.indexOf(" ") != -1;
      const targetUser = hasSpace ? value.slice(0, value.indexOf(" ")) : value;

      if ( this.chatService.isMe(targetUser) ) {

        const otherContent : string = hasSpace ? value.slice(value.indexOf(" ") + 1) : null;
        const toDiscard = new RegExp(` ${firerPrefix}.*`)
        const firer : string = otherContent ?
          ( otherContent.startsWith(firerPrefix) ? otherContent.replace(firerPrefix, "") :
            `me[${this.chatService.me}], with trashFirer : "${otherContent.replace(toDiscard, "")}"` )
          : this.chatService.me;

        let myIpCommand = ``;
        this.ipService.findIpInfo(myIpCommand).subscribe(ip => {
          let myCountryStr : string = `my[${targetUser}] country is : ${ip.country_name}, fired by[${firer}]`;
          this.chatService.send(myCountryStr);
        });
      }
      this.discardMessage();
    } else if ( command == "country" ) {
      if ( this.chatService.isMe(author) ) {
        this.chatService.send(`/${withFirerCommand} ${value} ${firerPrefix}${this.chatService.me}`);
      }
      this.discardMessage();
    } else {
      return;
    }
  }
}
