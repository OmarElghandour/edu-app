import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersListingComponent } from './teachers-listing.component';

describe('TeachersListingComponent', () => {
  let component: TeachersListingComponent;
  let fixture: ComponentFixture<TeachersListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
