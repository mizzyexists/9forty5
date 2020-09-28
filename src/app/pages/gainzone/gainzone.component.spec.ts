import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GainzoneComponent } from './gainzone.component';

describe('GainzoneComponent', () => {
  let component: GainzoneComponent;
  let fixture: ComponentFixture<GainzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GainzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GainzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
