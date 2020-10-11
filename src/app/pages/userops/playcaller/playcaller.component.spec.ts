import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaycallerComponent } from './playcaller.component';

describe('PlaycallerComponent', () => {
  let component: PlaycallerComponent;
  let fixture: ComponentFixture<PlaycallerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaycallerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaycallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
