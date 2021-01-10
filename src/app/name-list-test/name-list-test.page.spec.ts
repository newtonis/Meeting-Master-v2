import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NameListTestPage } from './name-list-test.page';

describe('NameListTestPage', () => {
  let component: NameListTestPage;
  let fixture: ComponentFixture<NameListTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameListTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NameListTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
