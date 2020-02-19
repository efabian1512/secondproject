import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSlideComponent } from './products-slide.component';

describe('ProductsSlideComponent', () => {
  let component: ProductsSlideComponent;
  let fixture: ComponentFixture<ProductsSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
