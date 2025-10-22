import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationInterface } from '../../../services/notification';

@Component({
  selector: 'app-item',
  standalone: true,
  templateUrl: './item.html',
  styleUrls: ['./item.css']
})
export class Item {
  @Input() notification!: NotificationInterface;
  @Output() close = new EventEmitter<string>();
  clicking = false;

  constructor(private router: Router) {}

  handleClick() {
    if (this.clicking) return;
    this.clicking = true;

    if (this.notification.link) {
      const link = this.notification.link;
      if (link.startsWith('/')) {
        this.router.navigateByUrl(link).finally(() => {
          this.close.emit(this.notification.id);
          this.clicking = false;
        });
      } else {
        window.location.href = link;
        this.close.emit(this.notification.id);
        this.clicking = false;
      }
    } else {
      this.close.emit(this.notification.id);
      this.clicking = false;
    }
  }

  handleCloseButton(event: MouseEvent) {
    event.stopPropagation();
    this.close.emit(this.notification.id);
  }
}
