import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepModel } from '../interfaces/steps';
import { ProductVariants, Colors } from '../interfaces/product-variant';
import { LocalService } from '../services/storage/local.service';
import { ObjectType } from '../interfaces/User';
import { ProductService } from '../services/productService/product.service';


@Component({
  selector: 'app-product-variant',
  templateUrl: './product-variant.component.html',
  styleUrls: ['./product-variant.component.css']
})
export class ProductVariantComponent implements OnInit {
clearData() {
  this.productService.clearProductVariantsData();
  this.colors = [];
  this.sizes = [];
  this.models = [];
  this.isLocalDataExist=false;

}


  @Input()
  step!: StepModel;
  productForm: any;
  colors: any = [];
  sizes: any = [];
  models: any = [];
  colorInvalid = false;
  sizeInvalid = false;
  modelInvalid = false;
  minColorLength = false;
  minSizeLength = false;
  minModelLength = false;
  productVariant = {} as ProductVariants;
  isLocalDataExist=false;
  isSaveSuccessful=false;
  isFormValid=true;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.step.isComplete = true;
    this.initForm();
    this.retreiveTemporaryData();

    
  }
  retreiveTemporaryData(){
    this.productVariant = this.productService.getVariantData() as ProductVariants;
    if (Object.keys(this.productVariant).length > 0) {
      this.isLocalDataExist=true;
      this.colors = this.productVariant.colors;
      this.sizes = this.productVariant.sizes;
      this.models = this.productVariant.models;
    }

  }

  initForm() {
    this.productForm = new FormGroup({
      colorName: new FormControl(""),
      sizeName: new FormControl(""),
      modelName: new FormControl("")
    });
  }



  onFormSubmit(formValue: any) {
    this.isSaveSuccessful=false;
    this.isFormValid = true;

    this.minColorLength = false;
    this.minSizeLength = false;
    this.minModelLength = false;

    if (this.colors.length == 0) {
      this.minColorLength = true;
      this.isFormValid = false;

    }
    if (this.sizes.length == 0) {
      this.minSizeLength = true;
      this.isFormValid = false;

    }
    if (this.models.length == 0) {
      this.minModelLength = true;
      this.isFormValid = false;
    }
    
    if(!this.isFormValid){
      return;

    }

    console.log(this.colors);
    console.log(this.sizes);
    console.log(this.models);

    this.productVariant.colors = this.colors;
    this.productVariant.sizes = this.sizes;
    this.productVariant.models = this.models;
    console.log(this.productVariant.colors );
    console.log(this.productVariant.sizes );
    console.log(this.productVariant.models );

    this.productService.saveVariantData(this.productVariant);

    console.log("Data Saved Locally, Form Submitted");
    this.isSaveSuccessful=true;





  }

  addColors(color: any, colorName: string) {
    console.log(colorName);
    this.colorInvalid = false;
    if (colorName == "") {
      console.log("color name is empty");
      this.colorInvalid = true;
      return;
    }
    let colour = {} as Colors;
    colour.name = colorName;
    colour.value = color;

    this.colors.push(colour);
    (this.productForm.get('colorName') as FormControl).setValue("");
    if(this.colors.length >0){
      this.minColorLength=false;
    }

  }
  addSizes(size: any) {
    this.sizeInvalid = false;
    if (size == "") {
      console.log("Size is empty");
      this.sizeInvalid = true;
      return;
      
    }


    this.sizes.push(size);
    (this.productForm.get('sizeName') as FormControl).setValue("");

    if(this.sizes.length >0){
      this.minSizeLength=false;
    }

  }
  addModels(modelName: any) {
    this.modelInvalid = false;
    if (modelName == "") {
      console.log("Model is empty");
      this.modelInvalid = true;
      return;
    }

    this.models.push(modelName);
    (this.productForm.get('modelName') as FormControl).setValue("");

    if(this.models.length >0){
      this.minModelLength=false;
    }

  }

  removeModel(model: any) {
    this.models = this.models.filter((e: any) => e !== model);
  }

  removeSize(size: any) {
    this.sizes = this.sizes.filter((e: any) => e !== size);
  }
  removeColor(color: any) {
    this.colors = this.colors.filter((e: Colors) => e.value !== color);
  }

}
