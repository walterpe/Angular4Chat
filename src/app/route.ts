import {Routes} from '@angular/router';
import {AppComponent} from './app.component'
import {ChatViewComponent} from './chat-view/chat-view.component'
import {LoginViewComponent} from "./login-view/login-view.component";
import {DisconnectedViewComponent} from "./disconnected-view/disconnected-view.component";

export const routes: Routes = [
  {path: 'login', component: LoginViewComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'chat', component: ChatViewComponent},
  {path: 'disconnected', component: DisconnectedViewComponent}
];
