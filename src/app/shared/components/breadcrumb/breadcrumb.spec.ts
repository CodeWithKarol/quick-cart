import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Breadcrumb } from './breadcrumb';
import { provideRouter } from '@angular/router';

describe('Breadcrumb', () => {
  let component: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumb],
      providers: [provideRouter([])], // Requires router for RouterLink
    }).compileComponents();

    fixture = TestBed.createComponent(Breadcrumb);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render breadcrumb items correctly', () => {
    fixture.componentRef.setInput('items', [
      { label: 'Home', link: '/' },
      { label: 'Category', link: '/category', queryParams: { sort: 'asc' } },
      { label: 'Current Page' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const ListItems = compiled.querySelectorAll('li');

    expect(ListItems.length).toBe(3);

    // Intermediate items should have an anchor tag
    const firstAnchor = ListItems[0].querySelector('a');
    expect(firstAnchor?.textContent?.trim()).toBe('Home');
    expect(firstAnchor?.getAttribute('href')).toBe('/');

    const secondAnchor = ListItems[1].querySelector('a');
    expect(secondAnchor?.textContent?.trim()).toBe('Category');
    expect(secondAnchor?.getAttribute('href')).toBe('/category?sort=asc');

    // Last item should be a span with aria-current
    const lastSpan = ListItems[2].querySelector('span');
    expect(lastSpan?.textContent?.trim()).toBe('Current Page');
    expect(lastSpan?.getAttribute('aria-current')).toBe('page');
  });
});
