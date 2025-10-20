import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBar } from './social-bar';

describe('SocialBar', () => {
  let component: SocialBar;
  let fixture: ComponentFixture<SocialBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
