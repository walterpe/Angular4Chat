import {Component} from "@angular/core";

import {PluginTemplateComponent} from "../plugin-template/plugin-template.component";
import {GiphyService} from "../services/giphy.service";
import {Giphy} from "../giphy";

@Component({
  selector: 'plugin-giphy',
  templateUrl: './plugin-giphy.component.html',
  styleUrls: ['./plugin-giphy.component.css']
})
export class PluginGiphyComponent extends PluginTemplateComponent {

  constructor(private giphyService: GiphyService) {
    super();

  }

  public src: string;

  process(command: string, value: string, author: string) {
    this.src = null;
    let tag: string = null;

    if (command != "gif") {
      return;
    }

    if (value) {
      tag = value;
    }

    this.giphyService.getRandomGif(tag).subscribe(
      (results: Giphy) => {
        this.src = results.data.image_url;
      });

    this.intercept();
  }

}
