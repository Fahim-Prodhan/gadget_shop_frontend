import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAllProductsComponent } from './category-all-products.component';

describe('CategoryAllProductsComponent', () => {
  let component: CategoryAllProductsComponent;
  let fixture: ComponentFixture<CategoryAllProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryAllProductsComponent]
    });
    fixture = TestBed.createComponent(CategoryAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
