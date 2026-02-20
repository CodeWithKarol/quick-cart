import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastContainerComponent } from './toast-widget';
import { ToastService } from '../../services/toast-service';
import { signal, WritableSignal } from '@angular/core';

describe('ToastContainerComponent', () => {
  let component: ToastContainerComponent;
  let fixture: ComponentFixture<ToastContainerComponent>;
  let mockToastService: { toasts: WritableSignal<unknown[]>; remove: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockToastService = {
      toasts: signal([]),
      remove: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ToastContainerComponent],
      providers: [{ provide: ToastService, useValue: mockToastService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render multiple toasts', () => {
    mockToastService.toasts.set([
      { id: 1, message: 'Message 1', type: 'success' },
      { id: 2, message: 'Message 2', type: 'error' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toastElements = compiled.querySelectorAll('[role="alert"]');
    expect(toastElements.length).toBe(2);
    expect(toastElements[0].textContent).toContain('Message 1');
    expect(toastElements[1].textContent).toContain('Message 2');
  });

  it('should apply correct dynamic classes based on toast type', () => {
    mockToastService.toasts.set([
      { id: 1, message: 'Success Toast', type: 'success' },
      { id: 2, message: 'Error Toast', type: 'error' },
      { id: 3, message: 'Info Toast', type: 'info' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toastElements = compiled.querySelectorAll('[role="alert"]');

    expect(toastElements[0].classList.contains('border-secondary-500')).toBe(true);
    expect(toastElements[1].classList.contains('border-red-500')).toBe(true);
    expect(toastElements[2].classList.contains('border-primary-400')).toBe(true);
  });

  it('should call toastService.remove when close button is clicked', () => {
    mockToastService.toasts.set([{ id: 42, message: 'Closable Toast', type: 'success' }]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const closeButton = compiled.querySelector('button');

    expect(closeButton).toBeTruthy();
    closeButton?.click();

    expect(mockToastService.remove).toHaveBeenCalledWith(42);
  });
});
