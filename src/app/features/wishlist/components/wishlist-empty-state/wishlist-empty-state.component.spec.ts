import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistEmptyState } from './wishlist-empty-state.component';
import { provideRouter } from '@angular/router';

describe('WishlistEmptyState', () => {
  let component: WishlistEmptyState;
  let fixture: ComponentFixture<WishlistEmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistEmptyState],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistEmptyState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty state message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Your wishlist is empty');
    expect(compiled.querySelector('p')?.textContent).toContain('Start saving your favorite items');
  });

  it('should contain a link to browse products', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link?.textContent).toContain('Browse Products');
    expect(link?.getAttribute('href')).toBe('/');
  });
});
