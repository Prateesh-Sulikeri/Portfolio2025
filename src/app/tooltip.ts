import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText = '';
  private tooltipEl: HTMLElement | null = null;
  private hideTimeout: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /** Common tooltip creation logic */
  private createTooltip(): void {
    if (this.tooltipEl) return;

    const tooltip = this.renderer.createElement('div') as HTMLElement;
    tooltip.textContent = this.tooltipText;
    this.renderer.addClass(tooltip, 'flat-tooltip');
    this.renderer.appendChild(document.body, tooltip);

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipX = hostRect.left + hostRect.width / 2;
    const tooltipY = hostRect.top - 42;

    this.renderer.setStyle(tooltip, 'position', 'absolute');
    this.renderer.setStyle(tooltip, 'top', `${tooltipY}px`);
    this.renderer.setStyle(tooltip, 'left', `${tooltipX}px`);
    this.renderer.setStyle(tooltip, 'transform', 'translateX(-50%)');
    this.renderer.addClass(tooltip, 'visible');

    this.tooltipEl = tooltip;
  }

  /** Desktop hover */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.createTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.removeTooltip();
  }

  /** Mobile tap — show briefly then fade out */
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.createTooltip();
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => this.removeTooltip(), 2500); // auto-hide after 2.5s
  }

  /** Remove tooltip safely */
  private removeTooltip(): void {
    if (!this.tooltipEl) return;

    const tooltipRef = this.tooltipEl;
    this.tooltipEl = null;

    this.renderer.removeClass(tooltipRef, 'visible');
    setTimeout(() => {
      this.renderer.removeChild(document.body, tooltipRef);
    }, 1800); // fade out smoothly
  }

  ngOnDestroy(): void {
    clearTimeout(this.hideTimeout);
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }
}
