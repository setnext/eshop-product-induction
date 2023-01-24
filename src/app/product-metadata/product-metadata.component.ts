import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/authService/auth.service';
import { RangeService } from '../services/rangeService/range.service';
import { StepModel } from '../interfaces/steps';
import { ProductMetaData } from "src/app/interfaces/product-metadata";
import { ProductService } from '../services/productService/product.service';

@Component({
  selector: 'app-product-metadata',
  templateUrl: './product-metadata.component.html',
  styleUrls: ['./product-metadata.component.css']
})
export class ProductMetadataComponent implements OnInit {
 
 

  // StepModel is used to define the Steps in the Wizard
  @Input()
  step!: StepModel;

  // MetaData Object Holds the Temporary ProductMetaData Form
  metaData: ProductMetaData = {} as ProductMetaData;

  isProductFound=false;
  exitingProductUrl='';
  
  

  isLocalDataExist=false;

  // It is used to Show/Hide display of Form Successful Message
  isSaveSuccessful = false;

  // It is used to define the Form Submitted Status
  submitted = false;

  // Product Form hold the reference of the Form
  productForm: any;

  // Current Parent will hold the Currently Selected Category
  currentParent: any;

  // SubCategoryList  holding the Sub Category Data which is retreived from the Range Service API
  subCategoryList: any = [];

  // selectedCategoryList holding the Selected Sub Category Data as Path String . Ex: /fashion, /fashion/men
  selectedCategoryList: any = [];

  // Tags holding the Added Tags from the User
  tags: any = []

  // PrimaryCategory holding the Primary Category Data which is retreived from the API
  primaryCategory: any = [];

  // Constructor
  // Intiate Auth Service
  // Initiate Range Service
  // Intiate Product Service
  constructor(private auth: AuthService, private rangeService: RangeService, private productService: ProductService) {
    this.auth.checkLoginStatus();
  }

  // NGINIT
  ngOnInit(): void {

   

    console.log("NG INit called");
    // this.metaData = this.productService.getMetaData() as ProductMetaData;
    // if(this.metaData!=null){
    //   console.log("Local Data found")
    // }
    // else
    // {
    //   console.log("No Local Data Found");
    // }

    this.step.isComplete = true;

    // Initating Save Message to Hide
    this.isSaveSuccessful = false;
    // Intiating Form Group
    this.initForm()

    // Retreving Primary Category
    this.primaryCategory = this.rangeService.getPrimaryCategory();

    // Retreving Temporary Data if it stored in the previous Entry
    this.RetrieveStoredData();
  }

  // Retreiving Stored Data from the Previous Action if any
  private RetrieveStoredData() {
    this.metaData = this.productService.getMetaData() as ProductMetaData;
    if (Object.keys(this.metaData).length > 0) {
      this.isLocalDataExist=true;
      (this.productForm.get('productName') as FormControl).setValue(this.metaData.productName);
      (this.productForm.get('productDescription') as FormControl).setValue(this.metaData.productDescription);
      (this.productForm.get('productCategory') as FormControl).setValue(this.metaData.primaryCategory);
      this.updateSubCategories(this.metaData.primaryCategory, this.metaData.subCategorySelections);
      this.selectedCategoryList = this.metaData.subCategories;
      this.tags = this.metaData.tags;
      (this.productForm.get('brand') as FormControl).setValue(this.metaData.brand);
      (this.productForm.get('kind') as FormControl).setValue(this.metaData.kind);
      (this.productForm.get('material') as FormControl).setValue(this.metaData.material);
      (this.productForm.get('mpn') as FormControl).setValue(this.metaData.mpn);


    
    }
  }

  // On Change of Tag, Delete if anyone Changes to Unselect
  onTagChange(value: any) {
    this.tags.splice(value, 1)
  }
  
  //This will ensure, step is complete and Enable the Continue Button 
  onCompleteStep() {
    this.step.isComplete = true;
  }

  // Intiaalizing the Product Form Group
  initForm() {
    this.productForm = new FormGroup({
      productName: new FormControl("", Validators.required),
      productDescription: new FormControl("", [Validators.required, Validators.minLength(100)]),
      productCategory: new FormControl("", Validators.required),
      productSubCategory: new FormControl(""),
      subCategories: new FormArray([]),
      tags: new FormControl(""),
      brand: new FormControl("", Validators.required),
      kind: new FormControl("", Validators.required),
      material: new FormControl("", Validators.required),
      mpn: new FormControl("", Validators.required)
    });
  }

  // On Submit of the Form
  onFormSubmit(formValue: any) {
    this.submitted = true;
    console.log(formValue);

    this.isProductFound = false;

    this.productService.findProductByName(formValue.productName).subscribe(data=>{
      console.log(data);
      if(data.productFound){
        console.log("product already exists");
        this.isProductFound = true;
        this.exitingProductUrl = data.locationUrl;
        return;
      }
      

    })

    if (this.productForm.invalid) {

      console.log("form is invalid")
      console.log(this.productForm);
      return;
    }
    console.log(formValue.productCategory);
    this.isSaveSuccessful = false
    this.metaData.productName = formValue.productName;
    this.metaData.productDescription = formValue.productDescription;
    this.metaData.primaryCategory = formValue.productCategory;
    console.log(this.selectedCategoryList);
    this.metaData.subCategories = this.selectedCategoryList;
    this.metaData.subCategorySelections = formValue.subCategories;
    this.metaData.tags = this.tags;
    this.metaData.brand = formValue.brand;
    this.metaData.kind = formValue.kind;
    this.metaData.material = formValue.material;
    this.metaData.mpn = formValue.mpn;


    
    this.productService.saveMetaData(this.metaData);
    this.step.isComplete = true;
    console.log("Form Submitted!");
    this.isSaveSuccessful = true;
  }

  // Adding Tagging when click the Add Tag Button
  addTag(tagValue: string) {
    this.tags.push(tagValue);
    console.log(this.tags);
    (this.productForm.get('tags') as FormControl).patchValue('');
  }

  // On When Changing the Primary Category Dropdown
  onCategoryChange(id: any) {
    this.selectedCategoryList = [];
    this.currentParent = this.primaryCategory.filter((e: { id: any; }) => e.id == id)[0];
    this.selectedCategoryList.push("/" + this.currentParent.attributeValue);
    this.updateSubCategories(this.currentParent.id);
  }

  clearData() {
    
    console.log("clear Data");
    this.productService.clearLocalData();
   
    this.selectedCategoryList = [];
    this.currentParent="";
    this.tags=[];
  
  
    this.subCategories.clear();
    this.subCategoryList =[];
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.isLocalDataExist=false;
  
   





}

  // Getting SubCategory Controls
get subCategories() {
    return this.productForm.get('subCategories') as FormArray;
  }

  // Adding / Removing SubCategories when they Select/Unselect the Categories
  onSubCategoryClick(isSelected: boolean, index: any) {
    if (isSelected == true) {
      this.selectedCategoryList.push(this.selectedCategoryList[0] + this.subCategoryList[index].sub_category_path);
    }
    else {
      let itemIndex = this.selectedCategoryList.indexOf(this.selectedCategoryList[0] + this.subCategoryList[index].sub_category_path);
      this.selectedCategoryList.splice(itemIndex, 1)
    }
  }

  // Method to Retreive the Sub Categories and Update the Selection if any
  private updateSubCategories(id: number, selection?: boolean[]) {
    this.rangeService.getSubCategorisById(id).subscribe(data => {
      if (data != null || data != undefined || data.length > 0) {
        console.log("rebuilding category");
        this.subCategories.clear();
        this.subCategoryList = data;
        console.log(this.subCategoryList);
        console.log( this.subCategoryList.length);
        data.forEach((e: { display_name: any; }) => {
          this.subCategories.push(new FormControl(false));
        });
      }
      if (selection != null || !undefined) {
        selection?.forEach((e, i) => {
          if (e == true) {
            this.subCategories.controls[i].setValue(e);
          }
        });
      }
    });
  }
}