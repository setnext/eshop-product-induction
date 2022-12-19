import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMetadataComponent } from './product-metadata.component';

describe('ProductMetadataComponent', () => {
  let component: ProductMetadataComponent;
  let fixture: ComponentFixture<ProductMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
