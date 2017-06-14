import {Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone} from '@angular/core';
import {Message} from '../message'

import {ChatHandlerService} from '../chat-handler.service'
import {ChatCommunicationService} from '../chat-communication.service'
import {Router} from "@angular/router";


@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  constructor(private chatCommunication: ChatCommunicationService,
              private chatService: ChatHandlerService,
              private cdRef: ChangeDetectorRef,
              private zone: NgZone,
              private router: Router) {
  }

  @ViewChild('textInput')
  private textInput: ElementRef;

  @ViewChild('messagesDiv')
  private messagesDiv: ElementRef;

  text: string = '';

  get messages(): Message[] {
    return this.chatService.getMessages();
  }

  get users(): string[] {
    return this.chatService.getUsers();
  }

  ngOnInit() {
    this.chatService.connected().subscribe(value => {
      if (!value) {
        this.router.navigate(['/disconnected']);
      } else {
        this.afterChange(ChangeDetectionMethod.WaitForDetection, () => this.focusMessageField());
      }
    });
    this.chatCommunication.messagesStream().subscribe(m => {
      const max = this.messagesDiv.nativeElement.scrollHeight - this.messagesDiv.nativeElement.offsetHeight;
      const current = this.messagesDiv.nativeElement.scrollTop;
      const isScolledDown: boolean = max == current;
      if (isScolledDown) {
        this.afterChange(ChangeDetectionMethod.WaitForDetection, () => this.messagesDiv.nativeElement.scrollTop = this.messagesDiv.nativeElement.scrollHeight);
      }
    });
  }

  send() {
    if (!this.text) {
      return;
    }
    this.chatService.send(this.text);
    this.text = '';
    this.focusMessageField();
  }

  private focusMessageField() {
    if (this.textInput && this.textInput.nativeElement) {
      this.textInput.nativeElement.focus();
    }
  }

  private writeToChat(text: string) {
    if (this.text.slice(-1) != ' ') {
      this.text += ' ';
    }
    this.text += text + ' ';
    this.focusMessageField();
  }

  /* Show different execute code after the next digest cycle */
  private afterChange(detectionType: ChangeDetectionMethod, methodToDelay: () => void) {
    switch (detectionType) {
      case ChangeDetectionMethod.ForceDetection:
        this.cdRef.detectChanges();
        methodToDelay();
        break;
      case ChangeDetectionMethod.WaitForDetection:
        this.zone.onMicrotaskEmpty.first().subscribe(() => methodToDelay());
        break;
      case ChangeDetectionMethod.SimpleDelay:
        setTimeout(() => methodToDelay(), 0);
        break;
      case ChangeDetectionMethod.None:
        methodToDelay();
        break;
    }
  }

}

enum ChangeDetectionMethod {
  ForceDetection,
  WaitForDetection,
  SimpleDelay,
  None
}

