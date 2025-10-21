import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowMore } from './know-more';

describe('KnowMore', () => {
  let component: KnowMore;
  let fixture: ComponentFixture<KnowMore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowMore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowMore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
