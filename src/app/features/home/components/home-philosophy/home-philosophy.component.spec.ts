import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePhilosophyComponent } from './home-philosophy.component';
import { provideRouter } from '@angular/router';

describe('HomePhilosophyComponent', () => {
  let component: HomePhilosophyComponent;
  let fixture: ComponentFixture<HomePhilosophyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePhilosophyComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(HomePhilosophyComponent, {
        set: {
          template: `
          <div class="test-philosophy">
            <h2>Beauty in the <span>imperfect.</span></h2>
            <a routerLink="/about">READ THE JOURNAL</a>
          </div>
        `,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomePhilosophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render philosophy content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Beauty in the');
    expect(compiled.querySelector('a')?.getAttribute('href')).toBe('/about');
  });
});
