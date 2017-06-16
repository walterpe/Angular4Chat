import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {SunriseSunset, cityCoordinates, Coord} from './sunrise-sunset';

@Injectable()
export class SunriseSunsetService {
  private apiUrl = 'https://api.sunrise-sunset.org/json?';  // URL to web API

  constructor (private http: Http) {}

  getSunriseSunset(city): Observable<SunriseSunset> {
    if (cityCoordinates[city]) {
      let coord:Coord = cityCoordinates[city];
      return this.http.get(this.apiUrl + "lat=" + coord.lat + "&lng=" + coord.lng + "&date=today&formatted=0")
        .map(this.extractData)
        .catch(this.handleError);
    }
    return null;
  }
  private extractData(res: Response):SunriseSunset {
    let body:SunriseSunset = res.json().results;
    return body;
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
