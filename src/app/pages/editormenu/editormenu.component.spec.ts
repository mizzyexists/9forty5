import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditormenuComponent } from './editormenu.component';

describe('EditormenuComponent', () => {
  let component: EditormenuComponent;
  let fixture: ComponentFixture<EditormenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditormenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditormenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
