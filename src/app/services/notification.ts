import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationInterface {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  timeout?: number;
  link?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Notification {
  private _notifications = new BehaviorSubject<NotificationInterface[]>([]);
  notifications$ = this._notifications.asObservable();

  notify(
    message: string,
    type: 'info' | 'success' | 'error' = 'info',
    timeout = 5000,
    link?: string
  ): string {
    const id =
      typeof crypto !== 'undefined' && (crypto as any).randomUUID
        ? (crypto as any).randomUUID()
        : this._makeId();

    const notif: NotificationInterface = { id, message, type, timeout, link };
    const list = [notif, ...this._notifications.value].slice(0, 5);
    this._notifications.next(list);

    if (timeout && timeout > 0) {
      setTimeout(() => this.remove(id), timeout);
    }

    return id;
  }

  info(msg: string, timeout?: number, link?: string): string {
    return this.notify(msg, 'info', timeout ?? 5000, link);
  }

  success(msg: string, timeout?: number, link?: string): string {
    return this.notify(msg, 'success', timeout ?? 5000, link);
  }

  error(msg: string, timeout?: number, link?: string): string {
    return this.notify(msg, 'error', timeout ?? 5000, link);
  }

  remove(id: string) {
    this._notifications.next(this._notifications.value.filter(n => n.id !== id));
  }

  manual_clear(id: string) {
    this.remove(id);
  }

  private _makeId() {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
  }
}
