import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {ChatHandlerService} from "./chat-handler.service";
import {UsersListComponent} from "./users-list/users-list.component";
import {ChatCommunicationService} from "./chat-communication.service";
import {ChatViewComponent} from "./chat-view/chat-view.component";
import {RouterModule} from "@angular/router";
import {routes} from "./route";
import {LoginViewComponent} from "./login-view/login-view.component";

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    ChatViewComponent,
    LoginViewComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule
  ],
  providers: [
    ChatHandlerService,
    ChatCommunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
