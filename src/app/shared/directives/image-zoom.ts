import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
  inject,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appImageZoom]',
  standalone: true,
})
export class ImageZoomDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input('appImageZoom') zoomScale = 2;

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    const img = this.el.nativeElement.querySelector('img');
    if (img) {
      this.renderer.setStyle(img, 'transition', 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)');
      this.renderer.setStyle(img, 'cursor', 'zoom-in');
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    const img = this.el.nativeElement.querySelector('img');
    if (img) {
      this.renderer.setStyle(img, 'transform', `scale(${this.zoomScale})`);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const img = this.el.nativeElement.querySelector('img');
    if (img) {
      this.renderer.setStyle(img, 'transform', 'scale(1)');
      this.renderer.setStyle(img, 'transform-origin', 'center center');
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const img = this.el.nativeElement.querySelector('img');
    if (img) {
      // Use setStyle to update transform-origin for smooth panning
      this.renderer.setStyle(img, 'transform-origin', `${xPercent}% ${yPercent}%`);
    }
  }
}
