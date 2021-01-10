import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaticCalendarTestPage } from './static-calendar-test.page';

describe('StaticCalendarTestPage', () => {
  let component: StaticCalendarTestPage;
  let fixture: ComponentFixture<StaticCalendarTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticCalendarTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaticCalendarTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
