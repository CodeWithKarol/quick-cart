import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListHero } from './product-list-hero.component';

describe('ProductListHero', () => {
  let component: ProductListHero;
  let fixture: ComponentFixture<ProductListHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListHero],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('The Collection');
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Curated essentials for the modern home',
    );
  });
});
