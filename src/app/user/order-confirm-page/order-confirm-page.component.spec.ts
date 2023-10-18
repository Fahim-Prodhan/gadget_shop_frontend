import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmPageComponent } from './order-confirm-page.component';

describe('OrderConfirmPageComponent', () => {
  let component: OrderConfirmPageComponent;
  let fixture: ComponentFixture<OrderConfirmPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderConfirmPageComponent]
    });
    fixture = TestBed.createComponent(OrderConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
