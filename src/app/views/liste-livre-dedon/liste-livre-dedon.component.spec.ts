import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLivreDedonComponent } from './liste-livre-dedon.component';

describe('ListeLivreDedonComponent', () => {
  let component: ListeLivreDedonComponent;
  let fixture: ComponentFixture<ListeLivreDedonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeLivreDedonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLivreDedonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
