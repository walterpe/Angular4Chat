import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Giphy} from "../giphy";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GiphyService {

  constructor(private http: Http) {
  }

  public getRandomGif(tag?: string): Observable<Giphy> {
    let URL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC';

    if (tag) {
      URL += '&tag=' + tag;
    }
    return this.http.get(URL)
      .map(r => r.json());
  }
}
