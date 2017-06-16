import { Component } from '@angular/core';
import {Ip2Country} from "../ip2country";
import {IpServiceService} from "../ip-service.service";

import {PluginTemplateComponent} from '../plugin-template/plugin-template.component'
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-plugin-ip',
  templateUrl: './plugin-ip.component.html',
  styleUrls: ['./plugin-ip.component.css']
})
export class PluginIpComponent extends PluginTemplateComponent {

  constructor(private ipService : IpServiceService) {
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
      // const info = value.slice(0, value.indexOf(" "));
      // const value = value.slice(value.indexOf(" ") + 1);
      const info = value;
      this.write = `COUNTRY_ko command : "${info}" [${author}]`;

      // let ipRequest : Ip2Country = new Ip2Country();
      // if ( info == "ip" ) { ipRequest.ip = value; }
      // else
      // if ( info == "code" ) { ipRequest.country_code = value ; }
      // else
      // if ( info == "name" ) { ipRequest.country_name = value ; }
      // else {
      //   ipRequest.ip = "138.122.201.5_dummy";
      //   ipRequest.country_name = "Colombia_dummy";
      //   ipRequest.country_code = "CO_dummy";
      // }

      let myIp : Observable<Ip2Country> = this.ipService.findIpInfo(info);
      //let myIp : Observable<string> = this.ipService.findIpInfo(info);
      myIp.subscribe(
        ip => {
          this.write = `country command for ${value} : "${ip.country_code} ${ip.country_name} ${ip.ip}" [${author}]`;
          // this.write = `ip command : "${ip}" [${author}]`;
          this.intercept();
        }
      );
    } else {
      return;
    }
  }
}
