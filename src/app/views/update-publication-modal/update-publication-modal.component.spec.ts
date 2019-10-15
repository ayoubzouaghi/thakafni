import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePublicationModalComponent } from './update-publication-modal.component';

describe('UpdatePublicationModalComponent', () => {
  let component: UpdatePublicationModalComponent;
  let fixture: ComponentFixture<UpdatePublicationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePublicationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePublicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
