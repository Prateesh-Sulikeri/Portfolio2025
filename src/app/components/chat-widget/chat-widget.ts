import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  ts?: number;
}

const STORAGE_KEY = 'jinbo_chat_history_v1';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.html',
  styleUrls: ['./chat-widget.css'],
})
export class ChatWidget implements AfterViewChecked, AfterViewInit {
  @ViewChild('chatBody') chatBody!: ElementRef<HTMLDivElement>;
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  isOpen = false;
  isMinimized = false;
  isLoading = false;
  userInput = '';
  messages: ChatMessage[] = [];
  botOnline = false;

  private prevMessagesLen = 0;
  private userScrolledAway = false;
  private readonly nearBottomThreshold = 140;

  readonly apiUrl = 'https://jinbo.onrender.com/api/chat';
  readonly healthUrl = 'https://jinbo.onrender.com/health';

  constructor(private http: HttpClient) {
    this.loadFromStorage();
    this.checkHealth();
  }

  ngAfterViewInit(): void {
    const el = this.chatBody?.nativeElement;
    if (el) el.addEventListener('scroll', () => this.onChatScroll());
  }

  ngAfterViewChecked(): void {
    const len = this.messages?.length || 0;
    if (len !== this.prevMessagesLen) {
      if (!this.userScrolledAway) this.scrollToBottom();
      this.prevMessagesLen = len;
    }
  }

  private onChatScroll(): void {
    const el = this.chatBody?.nativeElement;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    this.userScrolledAway = distanceFromBottom > this.nearBottomThreshold;
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.userScrolledAway = false;
      setTimeout(() => this.inputEl?.nativeElement?.focus(), 220);
      this.scrollToBottom();
    }
  }

  closeChat(): void {
    this.isOpen = false;
    this.isMinimized = false;
  }

  sendMessage(): void {
    if (!this.botOnline) {
      this.messages.push({
        sender: 'bot',
        text: '⚠️ JinBo is currently offline. Please try again later.',
        ts: Date.now(),
      });
      return;
    }

    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ sender: 'user', text: input, ts: Date.now() });
    this.userInput = '';
    this.saveToStorage();
    this.isLoading = true;
    this.userScrolledAway = false;
    this.scrollToBottom();

    this.http.post<{ success: boolean; response: string }>(this.apiUrl, { message: input })
      .subscribe({
        next: (res) => {
          const reply = res?.success ? res.response : 'Sorry — no response.';
          this.messages.push({ sender: 'bot', text: reply, ts: Date.now() });
          this.isLoading = false;
          this.saveToStorage();
          if (!this.userScrolledAway) this.scrollToBottom();
        },
        error: () => {
          this.messages.push({
            sender: 'bot',
            text: '⚠️ Network error: could not reach JinBo. Try again later.',
            ts: Date.now(),
          });
          this.isLoading = false;
          this.saveToStorage();
          if (!this.userScrolledAway) this.scrollToBottom();
        }
      });
  }

  clearMessages(): void {
    this.clearConversation();
  }

  private clearConversation(): void {
    this.messages = [];
    this.userInput = '';
    this.isLoading = false;
    this.prevMessagesLen = 0;
    this.userScrolledAway = false;
    localStorage.removeItem(STORAGE_KEY);
  }

  private scrollToBottom(): void {
    const el = this.chatBody?.nativeElement;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.messages));
  }

  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.messages = JSON.parse(raw);
    } catch {
      this.messages = [];
    }
  }

  private checkHealth(): void {
  this.http.get<{ status: string }>(this.healthUrl).subscribe({
    next: (res) => {
      this.botOnline = res?.status === 'ok';
      if (!this.botOnline) this.scheduleHealthRetry();
    },
    error: () => {
      this.botOnline = false;
      this.scheduleHealthRetry();
    }
  });
}

private scheduleHealthRetry(): void {
  setTimeout(() => this.checkHealth(), 30000); // retry every 30s
}


  formatTime(ts?: number): string {
    if (!ts) return '';
    const d = new Date(ts);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') this.closeChat();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const panel = this.chatBody?.nativeElement?.closest('.chat-panel');
    const button = document.querySelector('.chat-button');
    const target = event.target as Node;
    if (this.isOpen && panel && !panel.contains(target) && !button?.contains(target)) {
      this.closeChat();
    }
  }

}
