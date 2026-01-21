import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appImageZoom]',
  standalone: true,
})
export class ImageZoomDirective {
  @Input('appImageZoom') zoomScale = 2;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('img'),
      'transform',
      `scale(${this.zoomScale})`,
    );
    this.renderer.setStyle(this.el.nativeElement.querySelector('img'), 'cursor', 'zoom-in');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement.querySelector('img'), 'transform', 'scale(1)');
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('img'),
      'transform-origin',
      'center center',
    );
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    this.renderer.setStyle(
      this.el.nativeElement.querySelector('img'),
      'transform-origin',
      `${xPercent}% ${yPercent}%`,
    );
  }
}
