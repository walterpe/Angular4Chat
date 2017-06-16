import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Giphy} from "../giphy";
import {Observable} from "rxjs/Observable";
import {ChatHandlerService} from "../chat-handler.service";

@Injectable()
export class GiphyService {

  public favorites: any = {};

  constructor(private http: Http, private chatHandlerService: ChatHandlerService) {
  }

  public getRandomGif(tag?: string): Observable<Giphy> {
    let URL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC';

    if (tag) {
      URL += '&tag=' + tag;
    }
    return this.http.get(URL)
      .map(r => r.json());
  }
  public addGif2Favorites(url: string) {
    if (!this.favorites[this.chatHandlerService.me]) {
      this.favorites[this.chatHandlerService.me] = [];
    }
    this.favorites[this.chatHandlerService.me].push(url);
  }
}
