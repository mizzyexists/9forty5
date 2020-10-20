import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshstocksComponent } from './refreshstocks.component';

describe('RefreshstocksComponent', () => {
  let component: RefreshstocksComponent;
  let fixture: ComponentFixture<RefreshstocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshstocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshstocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
