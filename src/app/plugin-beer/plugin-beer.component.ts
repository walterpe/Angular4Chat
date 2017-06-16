import {Component} from "@angular/core";

import {PluginTemplateComponent} from "../plugin-template/plugin-template.component";
import {BeerService} from "../beer/beer-service";
import {Beer} from "../beer/beer";

@Component({
  selector: 'plugin-beer',
  templateUrl: './plugin-beer.component.html',
  styleUrls: ['./plugin-beer.component.css']
})
export class PluginBeerComponent extends PluginTemplateComponent {

  beer: Beer;
  isShowIngredients = false;

  constructor(private beerService: BeerService) {
    super()
  }

  process(command: string, value: string, author: string) {
    if (command !== 'beer') {
      return;
    }
    this.beerService.getRandomBeer().subscribe((beer: Beer) => { this.beer = beer });
    this.intercept();
  }

  showIngredients() {
    this.isShowIngredients = !this.isShowIngredients;
  }

}
