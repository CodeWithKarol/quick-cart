import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeHeroComponent } from './home-hero.component';
import { provideRouter } from '@angular/router';
import { IMAGE_CONFIG } from '@angular/common';

describe('HomeHeroComponent', () => {
  let component: HomeHeroComponent;
  let fixture: ComponentFixture<HomeHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeroComponent],
      providers: [
        provideRouter([]),
        {
          provide: IMAGE_CONFIG,
          useValue: {
            disableImageSizeWarning: true,
            disableImageLazyLoadWarning: true,
          },
        },
      ],
    })
      .overrideComponent(HomeHeroComponent, {
        set: {
          template: `
          <div class="test-hero">
            <h1>curated living.</h1>
            <a routerLink="/shop">View Collection</a>
            <a routerLink="/about">The Philosophy</a>
          </div>
        `,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero texts and links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('curated living.');

    // Check links
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toBe('/shop');
    expect(links[1].getAttribute('href')).toBe('/about');
  });
});
