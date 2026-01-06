import { TestBed } from '@angular/core/testing';
import { AppShell } from './app-shell';
import { provideRouter } from '@angular/router';
import { CartService } from './features/cart/services/cart-service';
import { computed } from '@angular/core';

describe('AppShell', () => {
  let cartServiceSpy: any;

  beforeEach(async () => {
    cartServiceSpy = {
      cartCount: computed(() => 0),
    };

    await TestBed.configureTestingModule({
      imports: [AppShell],
      providers: [provideRouter([]), { provide: CartService, useValue: cartServiceSpy }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppShell);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo')?.textContent).toContain('QuickCart');
  });
});
