import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationInterface } from '../../../services/notification';

@Component({
  selector: 'app-item',
  standalone: true,
  templateUrl: './item.html',
  styleUrls: ['./item.css']
})
export class Item implements OnInit {
  @Input() notification!: NotificationInterface;
  @Output() close = new EventEmitter<string>();
  clicking = false;
  timeoutHandle?: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // Auto-dismiss with animation when timeout is defined
    if (this.notification.timeout && this.notification.timeout > 0) {
      this.timeoutHandle = setTimeout(() => {
        this.animateClose();
      }, this.notification.timeout - 300); // start animation slightly before it fully expires
    }
  }

  handleClick() {
    if (this.clicking) return;
    this.clicking = true;

    if (this.notification.link) {
      const link = this.notification.link;
      if (link.startsWith('/')) {
        this.router.navigateByUrl(link).finally(() => this.animateClose());
      } else {
        window.location.href = link;
        this.animateClose();
      }
    } else {
      this.animateClose();
    }
  }

  handleCloseButton(event: MouseEvent) {
    event.stopPropagation();
    this.animateClose();
  }

  private animateClose() {
    const el = document.querySelector(`[data-id="${this.notification.id}"]`);
    if (el && !el.classList.contains('closing')) {
      el.classList.add('closing');
      setTimeout(() => this.triggerClose(), 300);
    } else {
      this.triggerClose();
    }
  }

  private triggerClose() {
    clearTimeout(this.timeoutHandle);
    this.close.emit(this.notification.id);
    this.clicking = false;
  }
}
