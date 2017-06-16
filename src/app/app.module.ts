import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {ChatHandlerService} from "./chat-handler.service";
import {UsersListComponent} from "./users-list/users-list.component";
import {ChatCommunicationService} from "./chat-communication.service";
import {ChatViewComponent} from "./chat-view/chat-view.component";
import {RouterModule} from "@angular/router";
import { HttpModule, JsonpModule } from '@angular/http';
import {routes} from "./route";
import {LoginViewComponent} from "./login-view/login-view.component";
import {DisconnectedViewComponent} from "./disconnected-view/disconnected-view.component";
import {ConnectedGuard} from "./connected.guard";
import {MessageViewComponent} from "./message-view/message-view.component";
import {PluginTestComponent} from "./plugin-test/plugin-test.component";
import {PluginWeatherComponent} from "./plugin-weather/plugin-weather.component";
import {MessageInterceptorComponent} from "./message-interceptor/message-interceptor.component";
import { PluginRatesComponent } from './plugin-rates/plugin-rates.component';
import { PluginRatesService } from './plugin-rates/plugin-rates.service';
import { PluginChuckComponent } from './plugin-chuck/plugin-chuck.component';
import {ChuckService} from "./chuck.service";
import { PluginIpComponent } from './plugin-ip/plugin-ip.component';
import {IpServiceService} from "./ip-service.service";
import { PluginSunriseSunsetComponent } from './plugin-sunrise-sunset/plugin-sunrise-sunset.component';
import {SunriseSunsetService} from "./plugin-sunrise-sunset/sunrise-sunset.service";
import {PluginGiphyComponent} from "./plugin-giphy/plugin-giphy.component";
import {GiphyService} from "./services/giphy.service";

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    ChatViewComponent,
    LoginViewComponent,
    DisconnectedViewComponent,
    MessageInterceptorComponent,
    PluginTestComponent,
    PluginWeatherComponent,
    MessageViewComponent,
    PluginRatesComponent,
    PluginChuckComponent,
    PluginIpComponent,
    PluginSunriseSunsetComponent,
    PluginGiphyComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule
  ],
  providers: [
    ChatHandlerService,
    ChatCommunicationService,
    ConnectedGuard,
    PluginRatesService,
    ChuckService,
    IpServiceService,
    SunriseSunsetService,
    GiphyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
