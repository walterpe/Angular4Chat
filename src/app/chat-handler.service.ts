import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Message} from './message';

@Injectable()
export class ChatHandlerService {

  private messages: Message[] = [];
  private users: string[] = ['Jean', 'Ulises', 'Sebastien'];
  private isConnected: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  private me: string = '';

  public connect(name: string) {
    this.me = name;
    this.users.push(this.me);
    this.isConnected.next(true);
    setTimeout(() => {
      this.isConnected.next(false)
    }, 10000)
  }

  public connected(): Observable<boolean> {
    return this.isConnected.asObservable();
  }

  public send(text: string) {
    const message: Message = {
      time: this.formatDate(new Date()),
      author: this.me,
      text: text
    };
    this.messages.push(message);
  }

  public showWarning(warning: string) {
    const message: Message = {
      time: this.formatDate(new Date()),
      author: "SYSTEM",
      text: warning
    };
    this.messages.push(message);
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getUsers(): string[] {
    return this.users;
  }

  private formatDate(date: Date) {
    return this.pad2(date.getHours()) + ":" + this.pad2(date.getMinutes()) + ":" + this.pad2(date.getSeconds())
  }

  private pad2(number: Number) {
    return ('00' + number.toString()).slice(-2)
  }

}
