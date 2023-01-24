import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepModel } from '../interfaces/steps';
import { ProductTechnicalAttributes,TechnicalAttributes,FeatureAttributes } from '../interfaces/technical-attributes';
import { ProductService } from '../services/productService/product.service';

@Component({
  selector: 'app-product-technical-details',
  templateUrl: './product-technical-details.component.html',
  styleUrls: ['./product-technical-details.component.css']
})
export class ProductTechnicalDetailsComponent implements OnInit {

  @Input()
  step!: StepModel;

  constructor(private productService:ProductService) { }
  productForm:any;
  isLocalDataExist = false;
  feature_attribute:any=[] as FeatureAttributes[];
  technical_attribute:any=[] as FeatureAttributes[];
  product_notes:any=[];
  isFeatureAttributesInValid = false;
  isFeatureAttributeLengthInvalid =false ;
  isTechnicalAttributesLengthInvalid=false;
  isProductNotesLenghtInvalid=false;
  isTechnicalAttributesInValid = false;
  isNoteInValid=false;
  isSaveSuccessful=false;
  isFormInValid=false;
  productTechnicalAttributes:ProductTechnicalAttributes = {} as ProductTechnicalAttributes;
  technicalAttributes:TechnicalAttributes ={} as TechnicalAttributes;
  featureAttributes:FeatureAttributes ={} as FeatureAttributes;

  
  onFormSubmit(formValue:any){
  this.isFeatureAttributesInValid = false;
  this.isFeatureAttributeLengthInvalid =false ;
  this.isTechnicalAttributesLengthInvalid=false;
  this.isProductNotesLenghtInvalid=false;
  this.isTechnicalAttributesInValid = false;
  this.isNoteInValid=false;
  this.isSaveSuccessful=false;
  this.isFormInValid=false;

    if(this.feature_attribute.length <3){
      this.isFeatureAttributeLengthInvalid=true;
      this.isFormInValid=true;
    }
    if(this.technical_attribute.length <3){
      this.isTechnicalAttributesLengthInvalid=true;
      this.isFormInValid=true;
    }
    if(this.product_notes.length <3){
      this.isProductNotesLenghtInvalid=true;
      this.isFormInValid=true;
    }

    if(this.isFormInValid)
    {
      return;
    }
    this.featureAttributes = this.feature_attribute;
    this.technicalAttributes = this.technical_attribute;
    this.productTechnicalAttributes.feature_attributes =  this.feature_attribute;
    this.productTechnicalAttributes.technical_attributes = this.technical_attribute;
    this.productTechnicalAttributes.product_notes = this.product_notes;

    console.log(this.productTechnicalAttributes);

    this.productService.saveTechnicalAttributes(this.productTechnicalAttributes);

    this.isSaveSuccessful=true;
    this.step.isComplete=true;

  }
  addFeatureAttribute(key:string,value:string){
    if(key.trim()=="" || value.trim()==""){
      this.isFeatureAttributesInValid = true
      return;
    }
    let fatt ={} as FeatureAttributes;
    fatt.key = key;
    fatt.value = value;

    this.feature_attribute.push(fatt);
    (this.productForm.get('feature_key') as FormControl).setValue("");
    (this.productForm.get('feature_value') as FormControl).setValue("");

    if(this.feature_attribute.length >=3){
      this.isFeatureAttributeLengthInvalid = false;
    }

  }
  addTechnicalFeatureAttribute(key:string,value:string){
    if(key.trim()=="" || value.trim()==""){
      this.isTechnicalAttributesInValid = true
      return;
    }
    let tatt ={} as TechnicalAttributes;
    tatt.key = key;
    tatt.value = value;

    this.technical_attribute.push(tatt);
    (this.productForm.get('technicalFeature_key') as FormControl).setValue("");
    (this.productForm.get('technicalFeature_value') as FormControl).setValue("");
    if(this.technical_attribute.length >=3){
      this.isTechnicalAttributesLengthInvalid = false;
    }

  }
  addProductNote(note:string){

    if(note==""){
      this.isNoteInValid= true
      return;
    }
    this.product_notes.push(note);
    (this.productForm.get('product_note') as FormControl).setValue("");
    if(this.product_notes.length >=3){
      this.isProductNotesLenghtInvalid = false;
    }

  }
  ngOnInit(): void {
    this.initForm();
    this.RetrieveStoredData();

  
  }

  private RetrieveStoredData() {
    this.productTechnicalAttributes = this.productService.getTechnicalAttributesData() as ProductTechnicalAttributes;
    if (Object.keys(this.productTechnicalAttributes).length > 0) {
      this.isLocalDataExist=true;
      this.feature_attribute = this.productTechnicalAttributes.feature_attributes;
      this.technical_attribute = this.productTechnicalAttributes.technical_attributes;
      this.product_notes = this.productTechnicalAttributes.product_notes;
     
    }
  }

  initForm() {
    this.productForm = new FormGroup({
      feature_key: new FormControl(""),
      feature_value: new FormControl(""),
      technicalFeature_key: new FormControl("", Validators.required),
      technicalFeature_value: new FormControl(""),
      product_note: new FormControl(""),
    });
  }
  clearData() {
    this.productService.clearTechnicalAttributesData();
    this.feature_attribute=[];
    this.technical_attribute=[];
    this.product_notes = [];
    this.isLocalDataExist=false;
    }


}
