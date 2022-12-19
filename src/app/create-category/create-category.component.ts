import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { buffer } from 'rxjs';
import { RangeService } from '../services/rangeService/range.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryForm: any;
  subCategories: any = [];
  currentParentCategoryId = 0;
  currentParent:any;
  newSubCategory = '';
  categoryAlreadyExists=false;
  maxExhausted = false;

  primaryCategory = [
    { id: 1, "categoryName": "Fashion", "attributeValue": "fashion" },
    { id: 2, "categoryName": "Electronics", "attributeValue": "electronics" },
    { id: 3, "categoryName": "Furniture", "attributeValue": "furniture" },
    { id: 4, "categoryName": "Books", "attributeValue": "books" },
    { id: 5, "categoryName": "Baby Products", "attributeValue": "baby" },
    { id: 6, "categoryName": "Beauty", "attributeValue": "beauty" },
    { id: 7, "categoryName": "Pet Supplies", "attributeValue": "pet" },
    { id: 8, "categoryName": "Sports and Outdoors", "attributeValue": "sports" },

  ];

  constructor(private rangeService: RangeService) { }

  ngOnInit(): void {
    this.initForm();

  }
  initForm() {
    this.categoryForm = new FormGroup({
      productName: new FormControl("", Validators.required),
      productDescription: new FormControl("", Validators.required),
      productCategory: new FormControl("", Validators.required),
      productSubCategory: new FormControl("", [Validators.required, Validators.email]),
      selectedSubCategories: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      dateofbirth: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      pincode: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required)
    });

  }

  onFormSubmit(value: any) {

  }
  registerNewCategogy(value: any) {

    this.newSubCategory = value;
    console.log(this.newSubCategory);
  }

  reset(){
    this.maxExhausted=false;
    this.categoryAlreadyExists=false;
  }
  AddNewCategory() {
    this.reset()
   

    if(this.subCategories.length>=8)
    {
      this.maxExhausted = true;
      return;
    }
   

    const catName = this.newSubCategory.replace(' ', '-').toLowerCase().replace('&','and');

    console.log("converted Name", catName);

    if (this.subCategories.length > 0) {

      console.log("No Existing Sub Categories");

      if (this.subCategories.find((e: { sub_category: string; categoryId: number; }) => e.sub_category == catName && e.categoryId == this.currentParent.id)) {
        console.log("Category Already Exists");
        this.categoryAlreadyExists=true;
        return;
      }
    }
    this.rangeService.addNewCategory(this.currentParent.id,this.currentParent.attributeValue,catName,this.newSubCategory).subscribe(data=>{
     console.log("Category Saved Successfully");
     this.updateSubCategories();

    })






  }

  onCategoryChange(Id: string) {
    this.reset()

    this.currentParentCategoryId = parseInt(Id);
    
    this.currentParent = this.primaryCategory.filter(e=>e.id==this.currentParentCategoryId)[0];
     console.log(this.currentParent);


    console.log(Id);
    this.updateSubCategories();






  }


  private updateSubCategories() {
    this.rangeService.getSubCategorisById(this.currentParentCategoryId).subscribe(data => {
      console.log(data);

      if (data != null || data != undefined || data.length > 0) {
        this.subCategories = data;
        console.log(data);
      }

    });
  }
}

