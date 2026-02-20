import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeNewsletterComponent } from './home-newsletter.component';

describe('HomeNewsletterComponent', () => {
  let component: HomeNewsletterComponent;
  let fixture: ComponentFixture<HomeNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNewsletterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Join the Club');
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('should prevent default on form submit', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;

    // Create a mock event to spy on preventDefault
    const event = new Event('submit');
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    form.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
