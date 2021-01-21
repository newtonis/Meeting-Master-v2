import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpusPage } from './helpus.page';

describe('HelpusPage', () => {
  let component: HelpusPage;
  let fixture: ComponentFixture<HelpusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
