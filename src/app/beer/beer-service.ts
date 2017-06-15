import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Beer} from './beer';

@Injectable()
export class BeerService {
  private beerUrl = 'https://api.punkapi.com/v2/beers';  // URL to web API

  constructor(private http: Http) {
  }

  getRandomBeer(): Observable<Beer> {
    return this.http.get(`${this.beerUrl}/random`)
      .map(response => <Beer> response.json()[0])
      .do(beer => console.log('beer', beer))
      .do(beer => console.log('ingredients(malt)', JSON.stringify(beer.ingredients.malt)));
  }

}
