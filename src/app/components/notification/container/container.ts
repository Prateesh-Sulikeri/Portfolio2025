import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification, NotificationInterface } from '../../../services/notification';
import { Item } from '../item/item';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule, Item],
  templateUrl: './container.html',
  styleUrls: ['./container.css']
})
export class Container {
  notifications$;

  constructor(private notificationService: Notification) {
    this.notifications$ = this.notificationService.notifications$;
  }

  handleClose(id: any) {
    this.notificationService.remove(id);
  }

  trackById(index: number, item: NotificationInterface) {
    return item.id;
  }
}
