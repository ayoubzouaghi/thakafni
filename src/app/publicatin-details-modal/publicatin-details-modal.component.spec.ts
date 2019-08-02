import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicatinDetailsModalComponent } from './publicatin-details-modal.component';

describe('PublicatinDetailsModalComponent', () => {
  let component: PublicatinDetailsModalComponent;
  let fixture: ComponentFixture<PublicatinDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicatinDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicatinDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
