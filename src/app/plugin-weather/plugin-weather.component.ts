import {Component, OnInit} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {PluginTemplateComponent} from '../plugin-template/plugin-template.component'

@Component({
  selector: 'plugin-weather',
  templateUrl: './plugin-weather.component.html',
  styleUrls: ['./plugin-weather.component.css']
})
export class PluginWeatherComponent extends PluginTemplateComponent {

  constructor(private http: Http) {
    super()
  }

  url: string = "https://www.metaweather.com/api/location/search/?query=";
  urlLocation: string = "https://www.metaweather.com/api/location/";

  private write: string;
  private woeid: string;
  private weatherState: string;
  private weatherIcon: string;

  private icons = [{
    "state": "Heavy Cloud",
    "image": "hc.svg"
  }, {
    "state": "Light Cloud",
    "image": "lc.svg"
  }, {
    "state": "Showers",
    "image": "s.svg"
  }, {
    "state": "Snow",
    "image": "sn.svg"
  }, {
    "state": "Sleet",
    "image": "sl.svg"
  }, {
    "state": "Hail",
    "image": "h.svg"
  }, {
    "state": "Thunderstorm",
    "image": "t.svg"
  }, {
    "state": "Heavy Rain",
    "image": "hr.svg"
  }, {
    "state": "Light Rain",
    "image": "lr.svg"
  }, {
    "state": "Clear",
    "image": "c.svg"
  }
  ]

  process(command: string, value: string, author: string) {
    if (command != "meteo" || value == null) {
      return;
    }

    this.http.get(this.url + value).subscribe(r => {
      const response = r.json();

      if (response[0] == undefined) {
        this.write = "Ville inconnue";

      } else {
        this.woeid = response[0].woeid;

        this.http.get(this.urlLocation + this.woeid + "/").subscribe(r => {
          const response = r.json();

          console.log("=========> %s", response.consolidated_weather[0].weather_state_name);

          this.weatherState = response.consolidated_weather[0].weather_state_name;

          for (let icon of this.icons) {
            if (icon.state === this.weatherState) {
              this.weatherIcon = "assets/" + icon.image;

            }
          }

          this.write = `Météo ${value}: ${this.weatherState}`;
        });
      }

    });


    this.intercept();
  }

}
