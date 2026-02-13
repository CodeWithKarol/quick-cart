// @vitest-environment jsdom
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { provideRouter } from '@angular/router';
import { AppShell } from './app-shell';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { CartDrawerComponent } from './features/cart/components/cart-drawer/cart-drawer';
import { ToastContainerComponent } from './shared/components/toast/toast-widget';
import { axe } from 'vitest-axe';
import { describe, it, expect, beforeEach, beforeAll, afterEach } from 'vitest';

// expect.extend({ toHaveNoViolations });

@Component({
  selector: 'app-header',
  template: '<header>Header Content</header>',
  standalone: true,
})
class MockHeader {}

@Component({
  selector: 'app-footer',
  template: '<footer>Footer Content</footer>',
  standalone: true,
})
class MockFooter {}

@Component({
  selector: 'app-cart-drawer',
  template: '<div aria-label="cart drawer">Cart Drawer Content</div>',
  standalone: true,
})
class MockCartDrawerComponent {}

@Component({
  selector: 'app-toast-container',
  template: '<div aria-label="toasts">Toast Content</div>',
  standalone: true,
})
class MockToastContainerComponent {}

describe('AppShell', () => {
  let component: AppShell;
  let fixture: ComponentFixture<AppShell>;

  beforeAll(() => {
    // Initialize or reset the Angular testing environment
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShell],
      providers: [
        provideRouter([]), // Provide router for <router-outlet>
      ],
    })
      .overrideComponent(AppShell, {
        remove: {
          imports: [Header, Footer, CartDrawerComponent, ToastContainerComponent],
        },
        add: {
          imports: [MockHeader, MockFooter, MockCartDrawerComponent, MockToastContainerComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('Template Structure', () => {
    it('should render core layout components', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      expect(compiled.querySelector('app-header')).toBeTruthy();
      expect(compiled.querySelector('app-footer')).toBeTruthy();
      expect(compiled.querySelector('main')).toBeTruthy();
      expect(compiled.querySelector('router-outlet')).toBeTruthy();
      expect(compiled.querySelector('app-cart-drawer')).toBeTruthy();
      expect(compiled.querySelector('app-toast-container')).toBeTruthy();
    });

    it('should render the promo bar with correct text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const promoBar = compiled.querySelector('.bg-secondary-50');

      expect(promoBar).toBeTruthy();
      expect(promoBar?.textContent).toContain('Get free delivery on orders over $100');

      const promoLink = promoBar?.querySelector('a');
      expect(promoLink).toBeTruthy();
      expect(promoLink?.textContent).toContain('Browse products');
    });

    it('should have the correct base layout classes', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const container = compiled.querySelector('.min-h-screen');

      expect(container).toBeTruthy();
      expect(container?.classList.contains('flex')).toBe(true);
      expect(container?.classList.contains('flex-col')).toBe(true);
      expect(container?.classList.contains('bg-gray-50')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should pass accessibility checks', async () => {
      // Run axe on the rendered component
      const results = await axe(fixture.nativeElement);
      expect(results.violations).toEqual([]);
    });
  });
});
