import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDrawerTrustBadgesComponent } from './cart-drawer-trust-badges.component';

describe('CartDrawerTrustBadgesComponent', () => {
  let component: CartDrawerTrustBadgesComponent;
  let fixture: ComponentFixture<CartDrawerTrustBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDrawerTrustBadgesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDrawerTrustBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render trust badge texts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Secure');
    expect(compiled.textContent).toContain('Free Ship');
    expect(compiled.textContent).toContain('Returns');
  });
});
