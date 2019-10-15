import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilCoordonneeModalComponent } from './edit-profil-coordonnee-modal.component';

describe('EditProfilCoordonneeModalComponent', () => {
  let component: EditProfilCoordonneeModalComponent;
  let fixture: ComponentFixture<EditProfilCoordonneeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilCoordonneeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilCoordonneeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
