import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTechnicalDetailsComponent } from './product-technical-details.component';

describe('ProductTechnicalDetailsComponent', () => {
  let component: ProductTechnicalDetailsComponent;
  let fixture: ComponentFixture<ProductTechnicalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTechnicalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTechnicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
