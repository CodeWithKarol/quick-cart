import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDrawerEmptyComponent } from './cart-drawer-empty.component';

describe('CartDrawerEmptyComponent', () => {
  let component: CartDrawerEmptyComponent;
  let fixture: ComponentFixture<CartDrawerEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDrawerEmptyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDrawerEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty cart message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Your cart is empty');
  });
});
