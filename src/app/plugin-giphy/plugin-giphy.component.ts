import {Component} from "@angular/core";

import {PluginTemplateComponent} from "../plugin-template/plugin-template.component";
import {GiphyService} from "../services/giphy.service";
import {Giphy} from "../giphy";
import {ChatHandlerService} from "../chat-handler.service";

@Component({
  selector: 'plugin-giphy',
  templateUrl: './plugin-giphy.component.html',
  styleUrls: ['./plugin-giphy.component.css']
})
export class PluginGiphyComponent extends PluginTemplateComponent {

  public src: string;
  public favorites: any[];
  public me: string;

  constructor(private giphyService: GiphyService, private chatHandlerService: ChatHandlerService) {
    super();
    this.me = chatHandlerService.me;
  }

  process(command: string, value: string, author: string) {
    this.src = null;

    if (command !== "gif" && command !== "gif:favorites") {
      return;
    }

    if (command === "gif:favorites") {
      if (this.chatHandlerService.me === value) {
        this.favorites = this.giphyService.favorites;
        this.intercept();
      }
    }
    else {
      let tag: string = null;

      if (value) {
        tag = value;
      }

      this.giphyService.getRandomGif(tag).subscribe(
        (results: Giphy) => {
          this.src = results.data.image_url;
          this.intercept();
        });
    }
  }

  addGif2Favorites() {
    this.giphyService.addGif2Favorites(this.src);
  }
}
