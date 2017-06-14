import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Message} from './message';
import 'rxjs/add/operator/first';
import {ChatHandlerService} from "./chat-handler.service";
import {ChatCommunicationService} from "./chat-communication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
