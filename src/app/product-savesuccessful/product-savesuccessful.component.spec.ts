import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSavesuccessfulComponent } from './product-savesuccessful.component';

describe('ProductSavesuccessfulComponent', () => {
  let component: ProductSavesuccessfulComponent;
  let fixture: ComponentFixture<ProductSavesuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSavesuccessfulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSavesuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
