import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductInfoComponent } from './buy-product-info.component';

describe('BuyProductInfoComponent', () => {
  let component: BuyProductInfoComponent;
  let fixture: ComponentFixture<BuyProductInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyProductInfoComponent]
    });
    fixture = TestBed.createComponent(BuyProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
