import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';
import { StepsService } from '../services/stepService/steps.service';
import { Router } from '@angular/router';
import { StepModel } from '../interfaces/steps'
import { ProductService } from '../services/productService/product.service';
import { ProductMetaData } from '../interfaces/product-metadata';
import { ProductVariants } from '../interfaces/product-variant';
import { MarkettingAttributes } from '../interfaces/marketting-attributes';
import { ProductTechnicalAttributes } from '../interfaces/technical-attributes';
import { StockInfo } from '../interfaces/StockInfo';
import { PriceInfo } from '../interfaces/PriceInfo';
import { ProductEntity } from '../interfaces/product';
import { FileUploadService } from '../services/MediaService/fileupload.service';
import { TaxInfo } from '../interfaces/TaxInfo';

@Component({
  selector: 'app-product-wizard',
  templateUrl: './product-wizard.component.html',
  styleUrls: ['./product-wizard.component.css']
})
export class ProductWizardComponent implements OnInit {

  currentStep: Observable<StepModel|null> | undefined;
  productMetaData:ProductMetaData = {} as ProductMetaData;
  productMedias:any = [];
  productVariant:ProductVariants = {} as ProductVariants;
  markettingAttributes:MarkettingAttributes = {} as MarkettingAttributes;
  productTechnicalAttributes:ProductTechnicalAttributes ={} as ProductTechnicalAttributes;
  stockInfo ={} as StockInfo;
  priceInfo = {} as PriceInfo;
  product:ProductEntity = {} as ProductEntity;
  taxInfo: TaxInfo ={} as TaxInfo;

  constructor(
    private stepsService: StepsService,
    private router: Router, private productService:ProductService,
    private uploadService: FileUploadService) {

     }

  ngOnInit(): void {
    this.currentStep = this.stepsService.getCurrentStep();
    
  }

  onNextStep() {
    if (!this.stepsService.isLastStep()) {
      this.stepsService.moveToNextStep();
    } else {
      this.onSubmit();
    }
  }

  showButtonLabel() {
    return !this.stepsService.isLastStep() ? 'Continue' : 'Approve & Submit';
  }

  onSubmit(): void {

  

    this.productMetaData = this.productService.getMetaData() as ProductMetaData;
    this.productMedias = this.uploadService.getFiles();
    this.productVariant = this.productService.getVariantData() as ProductVariants;
    this.markettingAttributes = this.productService.getMarkettingAttributesData() as MarkettingAttributes;
    this.stockInfo = this.productService.getStockInfo() as StockInfo;
    this.priceInfo = this.productService.getPriceInfo() as PriceInfo;
    this.taxInfo = this.productService.getTaxInfo() as TaxInfo;
    this.productTechnicalAttributes = this.productService.getTechnicalAttributesData() as ProductTechnicalAttributes;
    
    this.product.productName = this.productMetaData.productName;
    this.product.productDescription = this.productMetaData.productDescription;
    this.product.brand = this.productMetaData.brand;
    this.product.primaryCategory = this.productMetaData.primaryCategory;
    this.product.subCategories = this.productMetaData.subCategories;
    this.product.tags = this.productMetaData.tags;
    this.product.material = this.productMetaData.material;
    this.product.kind = this.productMetaData.kind;
    this.product.mpn=this.productMetaData.mpn;
    // this.product.productMetaData = this.productMetaData;
    this.product.productImages =this.productMedias;
    this.product.productVariants = this.productVariant;
    this.product.commerceAttributes = this.markettingAttributes;
    this.product.priceInfo = this.priceInfo;
    this.product.stockInfo = this.stockInfo;
    this.product.taxInfo = this.taxInfo;
    this.product.feature_attributes = this.productTechnicalAttributes.feature_attributes;
    this.product.technical_attributes = this.productTechnicalAttributes.technical_attributes;
    this.product.product_notes = this.productTechnicalAttributes.product_notes;
    console.log("Product Submitted Successfully");
    this.productService.saveProduct(this.product).subscribe(data=>{
      console.log("Product Saved Successfully in DB");
      console.log(data.headers.get('Location'))
      let productUrl = data.headers.get('Location')||'';

      let productIdSplit = productUrl.split('/');
      let productId = productIdSplit[productIdSplit.length-1]


      // this.productService.clearLocalData();
      // this.productService.clearMarkettingAttributesData();
      // this.productService.clearProductVariantsData();
      // this.productService.clearTechnicalAttributesData();
      this.productService.clearUploadedFiles();
      this.stepsService.resetCurrentStep();
      this.router.navigate(['/create-success'],{queryParams:{productId:productId,"url":productUrl}});

    });


    console.log(this.product);


    // this.router.navigate(['/complete']);

    // productMetaData: ProductMetaData;
    // productImages: string[];
    // productVariants : ProductVariants;
    // commerceAttributes: MarkettingAttributes;
    // priceInfo:PriceInfo;
    // stockInfo:StockInfo;
    // taxInfo:TaxInfo;
    // feature_attributes:FeatureAttributes;
    // technical_attributes:TechnicalAttributes;
    // product_notes:string[]

  }

}
