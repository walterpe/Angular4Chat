import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  @Input()
  private users: string[];

  @Output()
  private onSelectUser = new EventEmitter<string>();

  selectUser(user: string) {
    this.onSelectUser.emit(user);
  }

}
