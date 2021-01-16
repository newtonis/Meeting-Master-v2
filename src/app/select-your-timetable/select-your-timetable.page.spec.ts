import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectYourTimetablePage } from './select-your-timetable.page';

describe('SelectYourTimetablePage', () => {
  let component: SelectYourTimetablePage;
  let fixture: ComponentFixture<SelectYourTimetablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectYourTimetablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectYourTimetablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
