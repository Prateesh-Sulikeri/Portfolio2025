// import {
//   Component,
//   ElementRef,
//   ViewChild,
//   AfterViewChecked,
//   HostListener,
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// interface ChatMessage {
//   sender: 'user' | 'bot';
//   text: string;
//   ts?: number;
// }

// const STORAGE_KEY = 'jinbo_chat_history_v1';

// @Component({
//   selector: 'app-chat-widget',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './chat-widget.html',
//   styleUrls: ['./chat-widget.css'],
// })
// export class ChatWidget implements AfterViewChecked {
//   @ViewChild('chatBody') chatBody!: ElementRef<HTMLDivElement>;
//   @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

//   isOpen = false;
//   isMinimized = false;
//   isLoading = false;
//   userInput = '';
//   messages: ChatMessage[] = [];

//   readonly apiUrl = 'https://jinbo.onrender.com/api/chat';

//   constructor(private http: HttpClient) {
//     this.loadFromStorage();
//   }

//   ngAfterViewChecked(): void {
//     this.scrollToBottom();
//   }

//   toggleChat(): void {
//     this.isOpen = !this.isOpen;
//     if (this.isOpen) {
//       setTimeout(() => this.inputEl?.nativeElement?.focus(), 250);
//     }
//   }

//   toggleMinimize(): void {
//     this.isMinimized = !this.isMinimized;
//   }

//   closeChat(): void {
//     this.isOpen = false;
//   }

//   sendMessage(): void {
//     const input = this.userInput.trim();
//     if (!input) return;

//     this.messages.push({ sender: 'user', text: input, ts: Date.now() });
//     this.userInput = '';
//     this.isLoading = true;
//     this.saveToStorage();

//     this.http
//       .post<{ success: boolean; response: string }>(this.apiUrl, { message: input })
//       .subscribe({
//         next: (res) => {
//           this.messages.push({
//             sender: 'bot',
//             text: res?.success ? res.response : 'Sorry — no response.',
//             ts: Date.now(),
//           });
//           this.isLoading = false;
//           this.saveToStorage();
//         },
//         error: () => {
//           this.messages.push({
//             sender: 'bot',
//             text: '⚠️ JinBo could not be reached. Try again later.',
//             ts: Date.now(),
//           });
//           this.isLoading = false;
//           this.saveToStorage();
//         },
//       });
//   }

//   private scrollToBottom(): void {
//     try {
//       const el = this.chatBody?.nativeElement;
//       if (el) el.scrollTop = el.scrollHeight;
//     } catch {}
//   }

//   private saveToStorage(): void {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(this.messages));
//     } catch {}
//   }

//   private loadFromStorage(): void {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (raw) {
//         const parsed = JSON.parse(raw);
//         if (Array.isArray(parsed)) this.messages = parsed;
//       }
//     } catch {
//       this.messages = [];
//     }
//   }

//   formatTime(ts?: number): string {
//     if (!ts) return '';
//     const d = new Date(ts);
//     return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
//   }

//   @HostListener('window:keydown', ['$event'])
//   onKeydown(e: KeyboardEvent) {
//     if (e.key === 'Escape') this.closeChat();
//   }
// }

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

  // scrolling helpers
  private prevMessagesLen = 0;
  private userScrolledAway = false; // true when user scrolls up away from bottom
  private readonly nearBottomThreshold = 140; // px from bottom considered "at bottom"

  readonly apiUrl = 'https://jinbo.onrender.com/api/chat';

  constructor(private http: HttpClient) {
    this.loadFromStorage();
  }

  // attach scroll listener after view init
  ngAfterViewInit(): void {
    try {
      const el = this.chatBody?.nativeElement;
      if (el) {
        el.addEventListener('scroll', () => this.onChatScroll());
      }
    } catch {}
  }

  // only auto-scroll when a new message came in *and* user hasn't scrolled away
  ngAfterViewChecked(): void {
    const len = this.messages?.length || 0;

    // If the message count changed (new message arrived or cleared)
    if (len !== this.prevMessagesLen) {
      // If user is near bottom or we just added a message from current user, scroll
      if (!this.userScrolledAway) {
        this.scrollToBottom();
      }
      this.prevMessagesLen = len;
    }
  }

  private onChatScroll(): void {
    const el = this.chatBody?.nativeElement;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    // if user is more than threshold away from bottom -> treat as "scrolled away"
    this.userScrolledAway = distanceFromBottom > this.nearBottomThreshold;
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      // reset "scrolled away" so it auto-scrolls on open if needed
      this.userScrolledAway = false;
      setTimeout(() => this.inputEl?.nativeElement?.focus(), 220);
      // force scroll when opening so user sees latest if they didn't intentionally scroll up
      this.scrollToBottom();
    }
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
    if (!this.isMinimized) {
      // expanding -> show bottom
      this.userScrolledAway = false;
      setTimeout(() => this.scrollToBottom(), 120);
    }
  }

  closeChat(): void {
    this.isOpen = false;
    this.isMinimized = false;
  }

  sendMessage(): void {
    const input = this.userInput.trim();
    if (!input) return;

    // push user message and make sure widget will scroll
    this.messages.push({ sender: 'user', text: input, ts: Date.now() });
    this.userInput = '';
    this.saveToStorage();
    this.isLoading = true;

    // when user sends, assume they want to be at bottom
    this.userScrolledAway = false;
    this.scrollToBottom();

    this.http.post<{ success: boolean; response: string }>(this.apiUrl, { message: input })
      .subscribe({
        next: (res) => {
          const reply = res?.success ? res.response : 'Sorry — no response.';
          this.messages.push({ sender: 'bot', text: reply, ts: Date.now() });
          this.isLoading = false;
          this.saveToStorage();
          // new message -> auto scroll if user didn't intentionally scroll away
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

  clearHistory(): void {
    this.messages = [];
    localStorage.removeItem(STORAGE_KEY);
    this.prevMessagesLen = 0;
    this.userScrolledAway = false;
  }

  private scrollToBottom(): void {
    try {
      const el = this.chatBody?.nativeElement;
      if (el) {
        // small smooth behavior
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    } catch {}
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.messages));
    } catch {}
  }

  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) this.messages = parsed;
      }
    } catch {
      this.messages = [];
    }
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

  clearMessages(): void {
    this.clearConversation();
  }

   clearConversation(): void {
    this.messages = [];
    this.userInput = '';
    this.isLoading = false;
    this.prevMessagesLen = 0;
    this.userScrolledAway = false;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
}