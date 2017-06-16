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
import {DisconnectedViewComponent} from "./disconnected-view/disconnected-view.component";
import {ConnectedGuard} from "./connected.guard";
import {MessageViewComponent} from "./message-view/message-view.component";
import {PluginTestComponent} from "./plugin-test/plugin-test.component";
import {MessageInterceptorComponent} from "./message-interceptor/message-interceptor.component";
import { PluginSunriseSunsetComponent } from './plugin-sunrise-sunset/plugin-sunrise-sunset.component';


import { HttpModule } from '@angular/http';
import {SunriseSunsetService} from "./plugin-sunrise-sunset/sunrise-sunset.service";

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    ChatViewComponent,
    LoginViewComponent,
    DisconnectedViewComponent,
    MessageInterceptorComponent,
    PluginTestComponent,
    MessageViewComponent,
    PluginSunriseSunsetComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ChatHandlerService,
    ChatCommunicationService,
    ConnectedGuard,
    SunriseSunsetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
