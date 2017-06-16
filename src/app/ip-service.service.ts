import { Injectable } from '@angular/core';
import {Ip2Country} from "./ip2country";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class IpServiceService {

  constructor(private http : Http) { }

  public findIpInfo(info: string) : Observable<Ip2Country> {
    let myReq : string = `http://freegeoip.net/json/${info}`;
    return this.http.get(myReq).map(r => {
      const resultJson = r.json();

      let result : Ip2Country = new Ip2Country();
      result.country_code = resultJson.country_code;
      result.country_name = resultJson.country_name;
      result.ip = resultJson.ip;
      return result;
    });
  }
}
