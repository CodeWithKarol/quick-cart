import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSuccessPage } from './order-success-page';
import { provideRouter } from '@angular/router';

describe('OrderSuccessPage', () => {
  let component: OrderSuccessPage;
  let fixture: ComponentFixture<OrderSuccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSuccessPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display success title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Order placed successfully!');
  });

  it('should contain a link to continue shopping', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[routerLink="/"]');
    expect(link).toBeTruthy();
  });
});
