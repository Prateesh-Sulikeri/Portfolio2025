import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProgjects } from './all-progjects';

describe('AllProgjects', () => {
  let component: AllProgjects;
  let fixture: ComponentFixture<AllProgjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProgjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProgjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
