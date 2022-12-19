import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/authService/auth.service';
import { RangeService } from '../services/rangeService/range.service';
import { StepModel } from '../interfaces/steps';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  @Input()
  step!: StepModel;
  
  

  productForm: any;
  selectedSubCategory ='';
  currentParent:any;
  subCategoryList:any=[];
  selectedCategoryList:any=[];
  tags:any=[]
  
  catArray = new FormArray([new FormControl('', Validators.required)]);
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

  subCategoryAll = [{
    "categoryId": 1,
    "category": "/fashion",
    "display_name": "Mens",
    "sub_category": "men",
    "sub_category_path": "/men",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 1,
    "category": "/fashion",
    "display_name": "Womens",
    "sub_category": "women",
    "sub_category_path": "/women",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 1,
    "category": "/fashion",
    "display_name": "Boys",
    "sub_category": "boys",
    "sub_category_path": "/boys",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 1,
    "category": "/fashion",
    "display_name": "Girls",
    "sub_category": "girls",
    "sub_category_path": "/girls",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 1,
    "category": "/fashion",
    "display_name": "Cosmetics",
    "sub_category": "cosmetics",
    "sub_category_path": "/cosmetics",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 1,
    "category": "/fashion",
    "display_name": "Festival Wears",
    "sub_category": "festival",
    "sub_category_path": "/festival",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 1,
    "category": "/fashion",
    "display_name": "Winter Fashion",
    "sub_category": "winter",
    "sub_category_path": "/winter",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 1,
    "category": "/fashion",
    "display_name": "Summer Seasionals",
    "sub_category": "summer",
    "sub_category_path": "/summer",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 2,
    "category": "/electronics",
    "display_name": "Mobile Phones",
    "sub_category": "mobiles",
    "sub_category_path": "/mobiles",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 2,
    "category": "/electronics",
    "display_name": "TV & Home Entertainment",
    "sub_category": "tv",
    "sub_category_path": "/tv",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 2,
    "category": "/electronics",
    "display_name": "Cameras",
    "sub_category": "cameras",
    "sub_category_path": "/cameras",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 2,
    "category": "/electronics",
    "display_name": "Computer Accessories",
    "sub_category": "computer",
    "sub_category_path": "/computer",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 3,
    "category": "/furniture",
    "display_name": "Kitchen & Home Appliances",
    "sub_category": "kitchen-furniture",
    "sub_category_path": "/kitchen-furniture",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 3,
    "category": "/furniture",
    "display_name": "Home Decors",
    "sub_category": "home-decors",
    "sub_category_path": "/home-decors",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 3,
    "category": "/furniture",
    "display_name": "Garden & Outdoors",
    "sub_category": "garden",
    "sub_category_path": "/garden",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 3,
    "category": "/furniture",
    "display_name": "Lighting",
    "sub_category": "lighting",
    "sub_category_path": "/lighting",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 4,
    "category": "/books",
    "display_name": "Literature",
    "sub_category": "literature",
    "sub_category_path": "/literature",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 4,
    "category": "/books",
    "display_name": "Fiction",
    "sub_category": "fiction",
    "sub_category_path": "/fiction",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 4,
    "category": "/books",
    "display_name": "Romance",
    "sub_category": "romance",
    "sub_category_path": "/romance",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 4,
    "category": "/books",
    "display_name": "Children",
    "sub_category": "children",
    "sub_category_path": "/children",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 4,
    "category": "/books",
    "display_name": "Text Books",
    "sub_category": "text-books",
    "sub_category_path": "/text-books",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  },
  {
    "categoryId": 4,
    "category": "/books",
    "display_name": "Action & Adventure",
    "sub_category": "action",
    "sub_category_path": "/action",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 5,
    "category": "/baby",
    "display_name": "Diapers & Wipes",
    "sub_category": "diapers",
    "sub_category_path": "/diapers",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 5,
    "category": "/baby",
    "display_name": "Baby Monitoring",
    "sub_category": "baby-monitors",
    "sub_category_path": "/baby-monitors",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 5,
    "category": "/baby",
    "display_name": "Bath & Skincare",
    "sub_category": "baby-bath",
    "sub_category_path": "/baby-bath",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 5,
    "category": "/baby",
    "display_name": "Feeding Supplies",
    "sub_category": "feeding-supplies",
    "sub_category_path": "/feeding-supplies",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 6,
    "category": "/beauty",
    "display_name": "Luxury Beauty",
    "sub_category": "luxury",
    "sub_category_path": "/luxury",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 6,
    "category": "/beauty",
    "display_name": "Skin Care",
    "sub_category": "skin-care",
    "sub_category_path": "/skin-care",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 6,
    "category": "/beauty",
    "display_name": "Fragrance",
    "sub_category": "fragrance",
    "sub_category_path": "/fragrance",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 6,
    "category": "/beauty",
    "display_name": "Haircare",
    "sub_category": "haircare",
    "sub_category_path": "/haircare",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 6,
    "category": "/beauty",
    "display_name": "Men's Grooming",
    "sub_category": "men",
    "sub_category_path": "/men",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 7,
    "category": "/pet",
    "display_name": "Dog Care",
    "sub_category": "dog",
    "sub_category_path": "/dog",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 7,
    "category": "/pet",
    "display_name": "Cat Care",
    "sub_category": "cat",
    "sub_category_path": "/cat",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 7,
    "category": "/pet",
    "display_name": "Birds",
    "sub_category": "birds",
    "sub_category_path": "/birds",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 8,
    "category": "/sports",
    "display_name": "Excercise & Fitness",
    "sub_category": "fitness",
    "sub_category_path": "/fitness",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 8,
    "category": "/sports",
    "display_name": "Cricket",
    "sub_category": "cricket",
    "sub_category_path": "/cricket",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 8,
    "category": "/sports",
    "display_name": "Badminton",
    "sub_category": "badminton",
    "sub_category_path": "/badminton",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 8,
    "category": "/sports",
    "display_name": "Cycling",
    "sub_category": "cycling",
    "sub_category_path": "/cycling",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 8,
    "category": "/sports",
    "display_name": "Football",
    "sub_category": "football",
    "sub_category_path": "/football",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
    ,
  {
    "categoryId": 8,
    "category": "/sports",
    "display_name": "swimming",
    "sub_category": "Swimming",
    "sub_category_path": "/Swimming",
    "is_active": true,
    "is_landing_category": false,
    "priority_level": 1,
    "is_root_category": false
  }
  ];
  selectedSubCategoryList:any = [];

  subCategory:any=[];


  constructor(private auth: AuthService,private rangeService:RangeService) {
    this.auth.checkLoginStatus();


  }

  ngOnInit(): void {
    this.initForm()
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
      productDescription: new FormControl("", Validators.required),
      productCategory: new FormControl("", Validators.required),
      productSubCategory: new FormControl("", [Validators.required, Validators.email]),
      subCategories:new FormArray([]),
      tags: new FormControl("", Validators.required),
      brand: new FormControl("", Validators.required),
      mrp_price: new FormControl("", Validators.required),
      sales_price: new FormControl("", Validators.required),
      discount: new FormControl("", Validators.required),
    });

  }

  onFormSubmit(formValue: any) {
    console.log(formValue);
    console.log("product Name ", formValue.productName);
    console.log("product Description ",formValue.productDescription);
    console.log("Sub Categorie ",this.selectedCategoryList);
    console.log("Tags" ,this.tags);
    console.log("Brand" ,formValue.brand);
    console.log("MRP Price" ,formValue.mrp_price);
    console.log("Sales Price" ,formValue.sales_price);
    console.log("Discount" ,formValue.discount);

  




  }

  addTag(tagValue:string){

    this.tags.push(tagValue);



  }

  onCategoryChange(id: any) {

    this.selectedCategoryList =[];

   

    this.currentParent = this.primaryCategory.filter(e=>e.id==id)[0];
    
    
    this.selectedCategoryList.push("/" + this.currentParent.attributeValue);

    
    this.updateSubCategories();



  }

  get subCategories(){

    return this.productForm.get('subCategories') as FormArray;

  }
  

  onSubCategoryClick(index:any){
    
    this.selectedCategoryList.push(this.selectedCategoryList[0]+this.subCategoryList[index].sub_category_path);
    

    

  }

  private updateSubCategories() {
    this.rangeService.getSubCategorisById(this.currentParent.id).subscribe(data => {
   

      if (data != null || data != undefined || data.length > 0) {
        this.subCategories.clear();
        this.subCategoryList = data;

        data.forEach((e: { display_name: any; }) => {

          

          this.subCategories.push(new FormControl(false));
          
        });
        

        
      }


    });
  }

 

}
