import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../services/cofigServices/config.service';
import { ProductService } from '../services/productService/product.service';
import { RangeService } from '../services/rangeService/range.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

primaryCategory: any = [];
submitted: any;
productForm: any;
products:any=[];
categoryString:any;
eshopUrl:any;
// Current Parent will hold the Currently Selected Category
currentParent: any;


// SubCategoryList  holding the Sub Category Data which is retreived from the Range Service API
subCategoryList: any = [];


// selectedCategoryList holding the Selected Sub Category Data as Path String . Ex: /fashion, /fashion/men
selectedCategoryList: any = [];

get subCategories() {
  return this.productForm.get('subCategories') as FormArray;
}

onCategoryChange(id: any) {
  this.selectedCategoryList = [];
  this.products = [];
  this.currentParent = this.primaryCategory.filter((e: { id: any; }) => e.id == id)[0];
  this.selectedCategoryList.push("/" + this.currentParent.attributeValue);
  this.updateSubCategories(this.currentParent.id);
}

onSubCategoryChange(subCategory: string) {

  this.productService.getProductsByCategory(this.currentParent.categoryName.toLowerCase(),subCategory).subscribe(data=>{
  this.products = data.products;
    console.log(data);
  })
  this.categoryString = this.currentParent.attributeValue + "/"+subCategory

  
  
}

  constructor(private rangeService:RangeService,private productService:ProductService,private config:ConfigService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      productCategory: new FormControl("", Validators.required),
      productSubCategory: new FormControl("")
    });
    this.eshopUrl = this.config.config.eshopWebUrl+'/dp/'
    this.primaryCategory = this.rangeService.getPrimaryCategory();
  }

  

  private updateSubCategories(id: number, selection?: boolean[]) {
    this.rangeService.getSubCategorisById(id).subscribe(data => {
      (this.productForm.get('productSubCategory') as FormControl).setValue("");
      if (data != null || data != undefined || data.length > 0) {
        console.log("rebuilding category");
        this.subCategoryList = data;
       
      }
      // if (selection != null || !undefined) {
      //   selection?.forEach((e, i) => {
      //     if (e == true) {
      //       this.subCategories.controls[i].setValue(e);
      //     }
      //   });
      // }
    });
  }

}
