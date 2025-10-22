import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevThougts } from './dev-thougts';

describe('DevThougts', () => {
  let component: DevThougts;
  let fixture: ComponentFixture<DevThougts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevThougts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevThougts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
