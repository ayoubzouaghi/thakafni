import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TousLesLivresComponent } from './tous-les-livres.component';

describe('TousLesLivresComponent', () => {
  let component: TousLesLivresComponent;
  let fixture: ComponentFixture<TousLesLivresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TousLesLivresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TousLesLivresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
