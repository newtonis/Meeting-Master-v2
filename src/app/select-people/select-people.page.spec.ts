import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectPeoplePage } from './select-people.page';

describe('SelectPeoplePage', () => {
  let component: SelectPeoplePage;
  let fixture: ComponentFixture<SelectPeoplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPeoplePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPeoplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
