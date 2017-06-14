import {ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {Message} from './message';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private cdRef: ChangeDetectorRef, private zone: NgZone) {
  }

  @ViewChild('textInput')
  private textInput: ElementRef;

  // Inputs
  name: string = '';
  text: string = '';

  // Display
  connected: boolean = false;
  users: string[] = ['Jean', 'Ulises', 'Sebastien'];

  messages: Message[] = [];

  connect() {
    this.connected = true;
    this.users.push(this.name);

    this.afterChange(ChangeDetectionMethod.WaitForDetection, () => this.focusMessageField());
  }

  send() {
    if (!this.text) {
      return;
    }
    const message: Message = {
      time: this.formatDate(new Date()),
      author: this.name,
      text: this.text
    };
    this.text = '';
    this.messages.push(message);
    this.focusMessageField();
  }

  private focusMessageField() {
    this.textInput.nativeElement.focus();
  }

  private formatDate(date: Date) {
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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
