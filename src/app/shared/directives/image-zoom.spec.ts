import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ImageZoomDirective } from './image-zoom';
import { By } from '@angular/platform-browser';

// Dummy component to test the directive
@Component({
  template: `
    <div [appImageZoom]="3" style="width: 200px; height: 200px; position: relative;">
      <img src="dummy.jpg" alt="test image" style="width: 100%; height: 100%;" />
    </div>
  `,
  standalone: true,
  imports: [ImageZoomDirective],
})
class TestZoomComponent {}

describe('ImageZoomDirective', () => {
  let component: TestZoomComponent;
  let fixture: ComponentFixture<TestZoomComponent>;
  let wrapperDiv: HTMLElement;
  let imgElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageZoomDirective, TestZoomComponent],
    });

    fixture = TestBed.createComponent(TestZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugEl = fixture.debugElement.query(By.directive(ImageZoomDirective));
    wrapperDiv = debugEl.nativeElement;
    imgElement = wrapperDiv.querySelector('img') as HTMLElement;
  });

  it('should create an instance via test component', () => {
    expect(component).toBeTruthy();
    expect(wrapperDiv).toBeTruthy();
  });

  it('should handle mouseenter correctly', () => {
    const event = new MouseEvent('mouseenter');
    wrapperDiv.dispatchEvent(event);
    fixture.detectChanges();

    // Verify properties set by directive
    expect(wrapperDiv.style.overflow).toBe('hidden');
    expect(imgElement.style.transform).toBe('scale(3)'); // scale specified in template
    expect(imgElement.style.cursor).toBe('zoom-in');
  });

  it('should handle mouseleave correctly', () => {
    // First trigger enter to set some initial state
    wrapperDiv.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    // Then trigger leave
    wrapperDiv.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();

    expect(imgElement.style.transform).toBe('scale(1)');
    expect(imgElement.style.transformOrigin).toBe('center center');
  });

  it('should update transform-origin on mousemove', () => {
    // We must mock getBoundingClientRect for consistent test values
    vi.spyOn(wrapperDiv, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      x: 100,
      y: 100,
      bottom: 300,
      right: 300,
      toJSON: () => {
        return {};
      },
    });

    // Simulate mouse move to the center of the element (200x200 wrapper at position 100,100 -> mouse at 200,200)
    // this offset means x,y = 100,100 inside the 200x200 block, which is 50%, 50%
    const event = new MouseEvent('mousemove', {
      clientX: 200,
      clientY: 200,
    });

    wrapperDiv.dispatchEvent(event);
    fixture.detectChanges();

    expect(imgElement.style.transformOrigin).toBe('50% 50%');

    // Simulate mouse move to the top-left (clientX 150 = 25% from left 100 inside 200 width)
    const event2 = new MouseEvent('mousemove', {
      clientX: 150,
      clientY: 150,
    });

    wrapperDiv.dispatchEvent(event2);
    fixture.detectChanges();

    expect(imgElement.style.transformOrigin).toBe('25% 25%');
  });
});
