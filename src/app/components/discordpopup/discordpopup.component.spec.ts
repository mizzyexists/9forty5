import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordpopupComponent } from './discordpopup.component';

describe('DiscordpopupComponent', () => {
  let component: DiscordpopupComponent;
  let fixture: ComponentFixture<DiscordpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscordpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
