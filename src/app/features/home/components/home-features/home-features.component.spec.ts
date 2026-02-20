import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFeaturesComponent } from './home-features.component';

describe('HomeFeaturesComponent', () => {
  let component: HomeFeaturesComponent;
  let fixture: ComponentFixture<HomeFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the three core features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const features = compiled.querySelectorAll('dt');
    expect(features.length).toBe(3);

    expect(features[0].textContent).toContain('Responsible Sourcing');
    expect(features[1].textContent).toContain('Quality First');
    expect(features[2].textContent).toContain('Carbon Conscious');
  });
});
