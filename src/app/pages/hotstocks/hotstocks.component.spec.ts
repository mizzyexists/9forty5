import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotstocksComponent } from './hotstocks.component';

describe('HotstocksComponent', () => {
  let component: HotstocksComponent;
  let fixture: ComponentFixture<HotstocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotstocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotstocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
