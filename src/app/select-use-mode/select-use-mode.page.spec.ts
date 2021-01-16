import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectUseModePage } from './select-use-mode.page';

describe('SelectUseModePage', () => {
  let component: SelectUseModePage;
  let fixture: ComponentFixture<SelectUseModePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUseModePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectUseModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
