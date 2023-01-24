import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepModel } from '../interfaces/steps';
import { MarkettingAttributes } from '../interfaces/marketting-attributes';
import { ProductService } from '../services/productService/product.service';
import { PriceInfo} from '../interfaces/PriceInfo';
import { TaxInfo } from '../interfaces/TaxInfo';
import { StockInfo } from '../interfaces/StockInfo';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.css']
})
export class ProductAttributesComponent implements OnInit {
clearHighlightTag() {
  
  (this.productForm.get('highlightTag') as FormControl).setValue("");
  console.log("Highlight tag cleared");

}
highlightTags=["New","OnSale","Most Wanted","Sponsered","Limited Edition"];
onHighLightTagChange(e: string) {
console.log(e);
}
  clearData() {
    this.productForm.reset();
    this.productService.clearMarkettingAttributesData();
    this.isLocalDataExist=false;
  }

  @Input()
  step!: StepModel;

  productForm: any;
  intialStarRating: any = 0;

  formModal: any;
  submitted = false;
  isSaveSuccessful = false;
  markettingAttributes: MarkettingAttributes = {} as MarkettingAttributes;
  isLocalDataExist = false;
  priceInfo = {} as PriceInfo;
  taxInfo = {} as TaxInfo;
  stockInfo = {} as StockInfo;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.step.isComplete = true;
    this.initForm();
    this.RetrieveStoredData();
  }

  // Intiaalizing the Product Form Group
  initForm() {
    this.productForm = new FormGroup({
      mrp_price: new FormControl("", [Validators.required]),
      sales_price: new FormControl("", Validators.required),
      discount: new FormControl("", Validators.required),
      isOnSale: new FormControl(false),
      highlightTag:new FormControl(""),
      tax1: new FormControl(0),
      tax2: new FormControl(0),
      tax3: new FormControl(0),
      isOnStock: new FormControl(true),
      stockQuantity: new FormControl(0),
      isAdult: new FormControl(false),
      channel_web: new FormControl(true),
      channel_mobile: new FormControl(true),
      channel_instore: new FormControl(true),
      channel_callcenter: new FormControl(false),
      channel_thirdparty: new FormControl(false),
      starRating: new FormControl(0),
    });
  }
  onSave() {
    console.log("Save Called");
  }

  private RetrieveStoredData() {
    this.isLocalDataExist = false;
    this.ExtractPriceAttributes();
    this.ExtractTaxAttributes();
    this.ExtractStockAttributes();
    this.ExtractMarkettingAttributes();
    
  }
  private ExtractPriceAttributes() {
    this.priceInfo = this.productService.getPriceInfo() as PriceInfo;
    if (Object.keys(this.priceInfo).length > 0) {
      this.isLocalDataExist = true;

      (this.productForm.get('mrp_price') as FormControl).setValue(this.priceInfo.mrp_price);
      (this.productForm.get('sales_price') as FormControl).setValue(this.priceInfo.sales_price);
      (this.productForm.get('discount') as FormControl).setValue(this.priceInfo.discount);
    }
  }
  private ExtractTaxAttributes() {
    this.taxInfo = this.productService.getTaxInfo() as TaxInfo;
    if (Object.keys(this.taxInfo).length > 0) {
      this.isLocalDataExist = true;
      (this.productForm.get('tax1') as FormControl).setValue(this.taxInfo.tax1);
      (this.productForm.get('tax2') as FormControl).setValue(this.taxInfo.tax2);
      (this.productForm.get('tax3') as FormControl).setValue(this.taxInfo.tax3);
    }
  }
  private ExtractStockAttributes() {
    this.stockInfo = this.productService.getStockInfo() as StockInfo;
    if (Object.keys(this.stockInfo).length > 0) {
      this.isLocalDataExist = true;
      (this.productForm.get('isOnStock') as FormControl).setValue(this.stockInfo.isOnStock);
      (this.productForm.get('stockQuantity') as FormControl).setValue(this.stockInfo.stockQuantity);
     
    }
  }

  private ExtractMarkettingAttributes() {
    this.markettingAttributes = this.productService.getMarkettingAttributesData() as MarkettingAttributes;
    if (Object.keys(this.markettingAttributes).length > 0) {
      this.isLocalDataExist = true;
      console.log(this.markettingAttributes);
      if (this.markettingAttributes.channel.find(e => e == 'web')) {
        console.log('web found');

        (this.productForm.get('channel_web') as FormControl).setValue(true);
      }
      else {
        (this.productForm.get('channel_web') as FormControl).setValue(false);
      }
      if (this.markettingAttributes.channel.find(e => e == 'mobile')) {
        console.log('mobile found');
        (this.productForm.get('channel_mobile') as FormControl).setValue(true);
      }
      else {
        (this.productForm.get('channel_mobile') as FormControl).setValue(false);
      }
      if (this.markettingAttributes.channel.find(e => e == 'instore')) {
        console.log('instore found');
        (this.productForm.get('channel_instore') as FormControl).setValue(true);
      }
      else {
        (this.productForm.get('channel_instore') as FormControl).setValue(false);
      }
      if (this.markettingAttributes.channel.find(e => e == 'callcenter')) {
        console.log('callcenter found');
        (this.productForm.get('channel_callcenter') as FormControl).setValue(true);
      }
      else {
        (this.productForm.get('channel_callcenter') as FormControl).setValue(false);
      }
      if (this.markettingAttributes.channel.find(e => e == 'vendor_Store')) {
        console.log('Third party found');
        (this.productForm.get('channel_thirdparty') as FormControl).setValue(true);
      }
      else {
        (this.productForm.get('channel_thirdparty') as FormControl).setValue(false);
      }
      (this.productForm.get('starRating') as FormControl).setValue(this.markettingAttributes.starRating);
      (this.productForm.get('isOnSale') as FormControl).setValue(this.markettingAttributes.isOnSale);
      
      (this.productForm.get('highlightTag') as FormControl).setValue(this.markettingAttributes.highlightTag);

      console.log("highlight tag",this.markettingAttributes.highlightTag);

      this.intialStarRating = this.markettingAttributes.starRating;
    }
  }

  onFormSubmit(formValue: any) {
    console.log("Hello");

    this.submitted = true;
    console.log(formValue);

    if (this.productForm.invalid) {

      console.log("form is invalid")
      console.log(this.productForm);
      return;
    }

    // Marketting Attributes - Start
   
    let channels = [];
    if (formValue.channel_web == true) { channels.push('web') };
    if (formValue.channel_mobile == true) { channels.push('mobile') };
    if (formValue.channel_instore == true) { channels.push('instore') };
    if (formValue.channel_callcenter == true) { channels.push('callcenter') };
    if (formValue.channel_thirdparty == true) { channels.push('vendor_Store') };
    
    this.markettingAttributes.isAdult = formValue.isAdult;
    this.markettingAttributes.channel = channels;
    this.markettingAttributes.isOnSale = formValue.isOnSale;
    this.markettingAttributes.starRating = formValue.starRating;
    this.markettingAttributes.highlightTag = formValue.highlightTag;
    // Marketting Attributes - End

    console.log(this.markettingAttributes);

    // Price Attributes - Start
   
    this.priceInfo.mrp_price = formValue.mrp_price;
    this.priceInfo.sales_price = formValue.sales_price;
    this.priceInfo.discount = formValue.discount;
    // Price Attributes - Start
   
// Tax Attributes - Start
   
    this.taxInfo.tax1 = formValue.tax1;
    this.taxInfo.tax2 = formValue.tax2;
    this.taxInfo.tax3 = formValue.tax3;
    // Tax Attributes - Start
   
// Stock Attributes - Start
   
    this.stockInfo.isOnStock = formValue.isOnStock;
    this.stockInfo.stockQuantity = formValue.stockQuantity;
    // Stock Attributes - end
   
    


    this.productService.savePriceInfo(this.priceInfo);
    this.productService.saveTaxInfo(this.taxInfo);
    this.productService.saveStockInfo(this.stockInfo);
    this.productService.saveMarkettingAttributes(this.markettingAttributes);
    
    this.isSaveSuccessful = true;









  }

  onChangeRating(value: any) {
    this.intialStarRating = value;


  }

}
