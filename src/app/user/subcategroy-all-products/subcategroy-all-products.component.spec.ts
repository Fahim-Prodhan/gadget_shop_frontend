import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategroyAllProductsComponent } from './subcategroy-all-products.component';

describe('SubcategroyAllProductsComponent', () => {
  let component: SubcategroyAllProductsComponent;
  let fixture: ComponentFixture<SubcategroyAllProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategroyAllProductsComponent]
    });
    fixture = TestBed.createComponent(SubcategroyAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
