import { Component, OnInit } from '@angular/core';
import {PluginTemplateComponent} from '../plugin-template/plugin-template.component'
import {ChuckService} from '../chuck.service';
import { Observable } from 'rxjs/Observable';
import { Chuck } from './chuck';
import {ChatHandlerService} from '../chat-handler.service';

@Component({
  selector: 'plugin-chuck',
  templateUrl: './plugin-chuck.component.html',
  styleUrls: ['./plugin-chuck.component.css']
})
export class PluginChuckComponent extends PluginTemplateComponent{

  /*
    "/chuck" => affiche une joke aléatoire.
    "/chuck ..." => recherche et affiche une joke aélatoire selon la catégorie indiquée.
    "/chuckhelp" => affiche une liste de catégorie afin d'afficher une joke aléatoire de cette catégorie.
    "/chuckfavorite ..." affiche les jokes mis en favoris pour une personne donnée.
  */

  constructor(private chuckService: ChuckService,
              private chatService: ChatHandlerService) {
    super()
  }

  chuckJoke: Chuck;
  categories: string[];
  write: any;
  commandCalled: string = '';
  target:string;
  actualFavorites:any[] = [];
  req: Observable<string>;


 

  process(command: string, value: string, author: string) {

    this.commandCalled = command;
    this.target = author;

    switch (command)
    {
      case 'chuck' :
        this.showRandomJoke(value);
        break;
      case 'chuckhelp' :
        this.showCategories();
        break;
      case 'chuckfavorite' :
        this.showFavorite(value);
        break;
      default : 
        return;
    }
   
  }

  showRandomJoke(value:string){

    if(value === null){
        //this.req = this.chuckService.getRandomeJoke().map(chuck => chuck.value);
        this.chuckService.getRandomeJoke().subscribe(joke => {
          this.chuckJoke = joke;
        });
    }else{
      this.chuckService.getJokeByCategory(value).subscribe(joke =>{
        this.chuckJoke = joke;
      });  
    }
   

    this.intercept();
  }

  showCategories(){

    if(this.target === this.chatService.me){
      this.chuckService.getCategories().subscribe(categories =>{
        this.categories = categories;
      });
      this.intercept();
    }else{
      this.discardMessage();
    }
  
  }

  showFavorite(value:string){
    if(value){
      this.actualFavorites =  this.chuckService.getFavorites(value);
      if(this.actualFavorites.length > 0){
        this.intercept();
      }else{
        this.discardMessage();
      }
      
    }else{
      this.discardMessage();
    }
    
  }

  showJokeByCategory(category:string){
    this.chatService.send("/chuck " + category);
  }

  addOrRemoveFavorite(joke: Chuck){
  
    if(joke != null){
      let isIn = this.isInFavorite(joke);

      if(isIn){
        this.chuckService.removeFavorite(joke);
      }else{
        this.chuckService.addFavorite({"target":this.target, "joke":joke});
      }
    }
    
  }

  isInFavorite(joke:Chuck){
    return this.chuckService.isFavorite(joke);
  }


}
