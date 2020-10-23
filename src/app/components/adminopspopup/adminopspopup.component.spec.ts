import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminopspopupComponent } from './adminopspopup.component';

describe('AdminopspopupComponent', () => {
  let component: AdminopspopupComponent;
  let fixture: ComponentFixture<AdminopspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminopspopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminopspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
