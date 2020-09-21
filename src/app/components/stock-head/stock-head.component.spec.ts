import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHeadComponent } from './stock-head.component';

describe('StockHeadComponent', () => {
  let component: StockHeadComponent;
  let fixture: ComponentFixture<StockHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
