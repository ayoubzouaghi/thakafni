import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilPictureModalComponent } from './edit-profil-picture-modal.component';

describe('EditProfilPictureModalComponent', () => {
  let component: EditProfilPictureModalComponent;
  let fixture: ComponentFixture<EditProfilPictureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilPictureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilPictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
