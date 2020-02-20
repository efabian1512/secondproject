import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlideContentComponent } from './admin-slide-content.component';

describe('AdminSlideContentComponent', () => {
  let component: AdminSlideContentComponent;
  let fixture: ComponentFixture<AdminSlideContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSlideContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSlideContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
