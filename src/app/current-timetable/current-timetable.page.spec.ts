import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrentTimetablePage } from './current-timetable.page';

describe('CurrentTimetablePage', () => {
  let component: CurrentTimetablePage;
  let fixture: ComponentFixture<CurrentTimetablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTimetablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentTimetablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
