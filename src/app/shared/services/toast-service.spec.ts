import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast-service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.toasts()).toEqual([]);
  });

  it('should add a toast and assign an incremental id', () => {
    service.show('Test Message', 'success');
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0]).toEqual({
      id: 0,
      message: 'Test Message',
      type: 'success',
    });

    service.show('Another Message', 'error');
    expect(service.toasts().length).toBe(2);
    expect(service.toasts()[1].id).toBe(1);
    expect(service.toasts()[1].type).toBe('error');
  });

  it('should remove a toast by id', () => {
    service.show('Message 1');
    service.show('Message 2');

    expect(service.toasts().length).toBe(2);

    // Remove the first toast (id: 0)
    service.remove(0);

    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].id).toBe(1);
    expect(service.toasts()[0].message).toBe('Message 2');
  });

  it('should auto-remove a toast after 3000ms', () => {
    vi.useFakeTimers();
    service.show('Auto-remove me');
    expect(service.toasts().length).toBe(1);

    // Fast forward time by 2999ms - toast should still be there
    vi.advanceTimersByTime(2999);
    expect(service.toasts().length).toBe(1);

    // Fast forward 1 more ms - toast should be removed
    vi.advanceTimersByTime(1);
    expect(service.toasts().length).toBe(0);
  });
});
