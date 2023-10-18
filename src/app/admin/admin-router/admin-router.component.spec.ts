import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRouterComponent } from './admin-router.component';

describe('AdminRouterComponent', () => {
  let component: AdminRouterComponent;
  let fixture: ComponentFixture<AdminRouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRouterComponent]
    });
    fixture = TestBed.createComponent(AdminRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
