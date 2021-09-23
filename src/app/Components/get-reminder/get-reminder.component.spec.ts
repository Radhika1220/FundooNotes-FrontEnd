import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReminderComponent } from './get-reminder.component';

describe('GetReminderComponent', () => {
  let component: GetReminderComponent;
  let fixture: ComponentFixture<GetReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
