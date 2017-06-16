import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Chuck } from './plugin-chuck/chuck';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ChuckService {

  private favorites:any[] = [];

  constructor(private http: Http) { }


  getRandomeJoke(): Observable<Chuck> {
    return this.http.get("https://api.chucknorris.io/jokes/random")
                    .map(this.extractData)
                    .catch(this.handleError);
    
  }

  getCategories(): Observable<string[]>{
     return this.http.get("https://api.chucknorris.io/jokes/categories")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getJokeByCategory(category:string): Observable<Chuck>{
     return this.http.get("https://api.chucknorris.io/jokes/random?category=" + category)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addFavorite(favorite:any){
    this.favorites.push(favorite);
  }

  getFavorites(target:string){
 
    let targetFavorite:Chuck[] = [];

    for (var i = 0; i < this.favorites.length; i++) {
      if(this.favorites[i].target === target){
        targetFavorite.push(this.favorites[i].joke)
      }
    }

    return targetFavorite;
    
    
  }

  removeFavorite(joke:any){
    for (var i = 0; i < this.favorites.length; i++) {
      if(this.favorites[i].joke.id === joke.id){
        this.favorites.splice(i, 1);
      }
    }
  }

  isFavorite(joke:any){
    if(joke){
      for (var i = 0; i < this.favorites.length; i++) {
        if(this.favorites[i].joke.id === joke.id){
          return true;
        }
      }
    }
    return false;
  }



  private extractData(res: Response) {
    let body = res.json();
    return body || { };
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
