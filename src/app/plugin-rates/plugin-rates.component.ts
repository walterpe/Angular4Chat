import {Component, OnInit} from '@angular/core';

import {PluginTemplateComponent} from '../plugin-template/plugin-template.component'
import {PluginRatesService}       from './plugin-rates.service';
import {Rates}       from './rates';


@Component({
  selector: 'plugin-rates',
  templateUrl: './plugin-rates.component.html',
  styleUrls: ['./plugin-rates.component.css']
})
export class PluginRatesComponent extends PluginTemplateComponent {

  constructor(private ratesService:PluginRatesService) {
    super()
  }

  private write:string;
  rates:Rates;


  process(command:string, value:string, author:string) {
    if (command != "rates") {
      return;
    }

    if (value.indexOf(" en ") > 0) {
      let amount:string = value.slice(0, value.indexOf(" "));
      let nextPart = value.slice(value.indexOf(" ") + 1);
      let base = nextPart.slice(0, nextPart.indexOf(" en "));
      let target = nextPart.slice(nextPart.indexOf(" en ") + 4);
      this.ratesService.getRates(base, target).subscribe(
        rates => this.write = value + ' =  ' + rates.rates[target] * Number(amount)
      );
    } else if (value.indexOf(" ") == -1) {
      this.ratesService.getRates('CHF', value).subscribe(
        rates => this.write = 'Rate CHF/' + value + ' : ' + rates.rates[value]
      );
    } else {
      let base = value.slice(0, value.indexOf(" "));
      let target = value.slice(value.indexOf(" ") + 1);
      this.ratesService.getRates(base, target).subscribe(
        rates => this.write = 'Rate ' + base + '/' + target + ' : ' + rates.rates[target]
      );
    }

    //this.write = `Asked for rate : "${value}" [${author}]`;

    this.intercept();
  }

}
