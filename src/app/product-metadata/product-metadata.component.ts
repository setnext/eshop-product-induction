import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/authService/auth.service';
import { RangeService } from '../services/rangeService/range.service';
import { StepModel } from '../interfaces/steps';
import { ProductMetaData,PriceInfo } from "src/app/interfaces/product-metadata";
import { ProductService } from '../services/productService/product.service';


@Component({
  selector: 'app-product-metadata',
  templateUrl: './product-metadata.component.html',
  styleUrls: ['./product-metadata.component.css']
})
export class ProductMetadataComponent implements OnInit {
  
  metaData:ProductMetaData = {} as ProductMetaData;
  priceInfo:PriceInfo ={} as PriceInfo;
  @Input()
  step!: StepModel;
  isSaveSuccessful=false;
  submitted = false;
  
  

  productForm: any;
  selectedSubCategory ='';
  currentParent:any;
  subCategoryList:any=[];
  selectedCategoryList:any=[];
  tags:any=[]
  
  catArray = new FormArray([new FormControl('', Validators.required)]);
  primaryCategory:any = [];

  
  selectedSubCategoryList:any = [];

  subCategory:any=[];


  constructor(private auth: AuthService,private rangeService:RangeService,private productService:ProductService) {
    this.auth.checkLoginStatus();


  }

  ngOnInit(): void {
    this.isSaveSuccessful = false;
    this.initForm()
    this.primaryCategory = this.rangeService.getPrimaryCategory();

    this.metaData = this.productService.getMetaData()
    console.log("MetaData ", this.metaData)

   
    

    if(Object.keys(this.metaData).length > 0)
    {


      (this.productForm.get('productName') as FormControl).setValue(this.metaData.productName);
      (this.productForm.get('productDescription') as FormControl).setValue(this.metaData.productDescription);
      (this.productForm.get('productCategory') as FormControl).setValue(this.metaData.primaryCategory);
      this.updateSubCategories(this.metaData.primaryCategory,this.metaData.subCategorySelections);
      this.tags = this.metaData.tags;
      (this.productForm.get('brand') as FormControl).setValue(this.metaData.brand);
      (this.productForm.get('mrp_price') as FormControl).setValue(this.metaData.priceInfo.mrp_price);
      (this.productForm.get('sales_price') as FormControl).setValue(this.metaData.priceInfo.sales_price);
      (this.productForm.get('discount') as FormControl).setValue(this.metaData.priceInfo.discount);
    

    }
  }

  onTagChange(value:any){

     this.tags.splice(value, 1)

  }
  onCompleteStep() {
    this.step.isComplete= true;

  }

  initForm() {
    this.productForm = new FormGroup({
      productName: new FormControl("", Validators.required),
      productDescription: new FormControl("", [Validators.required,Validators.minLength(100)]),
      productCategory: new FormControl("", Validators.required),
      productSubCategory: new FormControl(""),
      subCategories:new FormArray([]),
      tags: new FormControl(""),
      brand: new FormControl("", Validators.required),
      mrp_price: new FormControl("", [Validators.required]),
      sales_price: new FormControl("", Validators.required),
      discount: new FormControl("", Validators.required),
    });

  }



  onFormSubmit(formValue: any) {
    this.submitted = true;

    if (this.productForm.invalid) {
    
      console.log("form is invalid")
      console.log(this.productForm);
      return;
    }

   
    this.isSaveSuccessful = false
    console.log(formValue);
    console.log("hi")
    console.log("product Name ", formValue.productName);
    console.log("product Description ",formValue.productDescription);
    console.log("Sub Categorie ",this.selectedCategoryList);
    console.log("Tags" ,this.tags);
    console.log("Brand" ,formValue.brand);
    console.log("MRP Price" ,formValue.mrp_price);
    console.log("Sales Price" ,formValue.sales_price);
    console.log("Discount" ,formValue.discount);

  

    
 

    // if (this.productForm.valid) {

     console.log(this.tags);


      this.metaData.productName = formValue.productName;
      this.metaData.productDescription = formValue.productDescription;
      this.metaData.primaryCategory =  this.currentParent.id;
      this.metaData.subCategories = this.selectedCategoryList;
      this.metaData.subCategorySelections = formValue.subCategories;
      this.metaData.tags = this.tags;
      this.metaData.brand = formValue.brand;
      
      this.priceInfo.mrp_price = parseInt(formValue.mrp_price);
      this.priceInfo.sales_price = parseInt(formValue.sales_price);
      this.priceInfo.discount = parseInt(formValue.discount);
      this.metaData.priceInfo=this.priceInfo;
      this.productService.saveMetaData(this.metaData);

      // this.productForm.reset();

      this.step.isComplete= true;
      
      // this.metaData=this.productService.getMetaData();
      // console.log("return values  ",this.productService.getMetaData());
      // this.tags=this.metaData.tags;
      console.log("Form Submitted!");
      this.isSaveSuccessful = true;


      // productName: new FormControl("", Validators.required),
      // productDescription: new FormControl("", Validators.required),
      // productCategory: new FormControl("", Validators.required),
      // productSubCategory: new FormControl("", [Validators.required, Validators.email]),
      // subCategories:new FormArray([]),
      // tags: new FormControl("", Validators.required),
      // brand: new FormControl("", Validators.required),
      // mrp_price: new FormControl("", Validators.required),
      // sales_price: new FormControl("", Validators.required),
      // discount: new FormControl("", Validators.required),

      // ReFill the Form

     
     
      


      
      
    // }

  




  }

  addTag(tagValue:string){

    this.tags.push(tagValue);
    console.log(this.tags);
    (this.productForm.get('tags') as FormControl).patchValue('');



  }

  onCategoryChange(id: any) {

    this.selectedCategoryList =[];

   

    this.currentParent = this.primaryCategory.filter((e: { id: any; })=>e.id==id)[0];
    
    
    this.selectedCategoryList.push("/" + this.currentParent.attributeValue);

    
    this.updateSubCategories(this.currentParent.id);



  }

  get subCategories(){

    return this.productForm.get('subCategories') as FormArray;

  }
  

  onSubCategoryClick(isSelected:boolean ,index:any){

    console.log(isSelected);

    if(isSelected==true){

      this.selectedCategoryList.push(this.selectedCategoryList[0]+this.subCategoryList[index].sub_category_path);
    
    }
    else
    {
      console.log("Unchecking event");
      console.log("Starting Array: ", this.selectedCategoryList);
      let itemIndex = this.selectedCategoryList.indexOf(this.selectedCategoryList[0]+this.subCategoryList[index].sub_category_path);
      this.selectedCategoryList.splice(itemIndex, 1)
      console.log("Final Array: ", this.selectedCategoryList);

      
    }
    console.log(index);
    
    // this.selectedCategoryList.push(this.selectedCategoryList[0]+this.subCategoryList[index].sub_category_path);
    

    

  }

  private updateSubCategories(id:number,selection?:boolean[]) {
    this.rangeService.getSubCategorisById(id).subscribe(data => {
   

      if (data != null || data != undefined || data.length > 0) {
        this.subCategories.clear();
        this.subCategoryList = data;

        data.forEach((e: { display_name: any; }) => {

          

          this.subCategories.push(new FormControl(false));
          
        });
        

        
      }

      if(selection!=null || !undefined){
       
        selection?.forEach((e,i) => {

          if(e==true){
            this.subCategories.controls[i].setValue(e);
          }

          
          
        }); 
      }
     


    });
  }


}


