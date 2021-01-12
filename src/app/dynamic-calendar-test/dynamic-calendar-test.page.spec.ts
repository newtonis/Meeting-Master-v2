import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DynamicCalendarTestPage } from './dynamic-calendar-test.page';

describe('DynamicCalendarTestPage', () => {
  let component: DynamicCalendarTestPage;
  let fixture: ComponentFixture<DynamicCalendarTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicCalendarTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicCalendarTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
