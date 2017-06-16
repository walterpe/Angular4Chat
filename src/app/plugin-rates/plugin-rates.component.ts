import {Component, OnInit} from '@angular/core';

import {PluginTemplateComponent} from '../plugin-template/plugin-template.component'
import {PluginRatesService}       from './plugin-rates.service';
import {ChatHandlerService} from "../chat-handler.service";
import {Rates}       from './rates';


@Component({
  selector: 'plugin-rates',
  templateUrl: './plugin-rates.component.html',
  styleUrls: ['./plugin-rates.component.css']
})
export class PluginRatesComponent extends PluginTemplateComponent {

  constructor(private ratesService:PluginRatesService,
              private chatHandlerService:ChatHandlerService) {
    super()
  }

  private write:string;
  base:string = 'CHF';
  target:string = 'EUR';
  amount:number = 100;
  result:number = 0;
  showUI:boolean = false;
  showUsage:boolean = false;
  showResult:boolean = false;
  computed:boolean = false;
  rates:Rates;

  currencies:string[] = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD",
    "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP",
    "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"];


  process(command:string, value:string, author:string) {
    if (command != "rates") {
      return;
    }

    if (value == 'ui' && this.chatHandlerService.me === author) {
      this.showUI = true;
      this.intercept();
    } else if (value.indexOf(" en ") > 0) {
      this.amount = Number(value.slice(0, value.indexOf(" ")));
      let nextPart = value.slice(value.indexOf(" ") + 1);
      this.base = nextPart.slice(0, nextPart.indexOf(" en "));
      this.target = nextPart.slice(nextPart.indexOf(" en ") + 4);
      this.compute();
      this.intercept();
    } else if (this.chatHandlerService.me === author) {
      this.writeUsage();
      this.intercept();
    } else {
      this.discardMessage();
    }
  }

  writeUsage() {
    this.showUsage = true;
    this.write = ``;
  }

  compute() {
    this.ratesService.getRates(this.base, this.target).subscribe(
      rates => {
        this.result = rates.rates[this.target] * Number(this.amount);
        this.showUI = false;
        this.showResult = true;
      },
      error => this.writeUsage()
    );
  }
}
