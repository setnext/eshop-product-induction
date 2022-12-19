import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ConfigService } from "../cofigServices/config.service";



@Injectable({
    providedIn: 'root'
  })
  
  export class RangeService {

    rangeServiceUrl=''

    constructor(private http:HttpClient,private config:ConfigService){

        this.rangeServiceUrl = config.config.rangeServiceUrl

    }

    getSubCategorisById(categoryId:number):Observable<any>{
        return this.http.get<any>(this.rangeServiceUrl+'/api/v1/range/subcategories/'+categoryId).pipe(
          catchError((err) => {
            return throwError(err);    //Rethrow it back to component
          }));
        
      
      }

      getPrimaryCategory(){
       return [
        { id: 1, "categoryName": "Fashion", "attributeValue": "fashion" },
        { id: 2, "categoryName": "Electronics", "attributeValue": "electronics" },
        { id: 3, "categoryName": "Furniture", "attributeValue": "furniture" },
        { id: 4, "categoryName": "Books", "attributeValue": "books" },
        { id: 5, "categoryName": "Baby Products", "attributeValue": "baby" },
        { id: 6, "categoryName": "Beauty", "attributeValue": "beauty" },
        { id: 7, "categoryName": "Pet Supplies", "attributeValue": "pet" },
        { id: 8, "categoryName": "Sports and Outdoors", "attributeValue": "sports" },
    
      ]; 
      
      }

      addNewCategory(parentCategoryId:number,parentCategoryName:string,categoryName:string,categoryDisplayName:string):Observable<any>{

        return this.http.post<any>(this.rangeServiceUrl+'/api/v1/range/categories', {
            "categoryId":parentCategoryId ,
            "category": "/"+parentCategoryName,
            "display_name": categoryDisplayName,
            "sub_category": categoryName,
            "sub_category_path": "/"+categoryName,
            "is_active": true,
            "is_landing_category": false,
            "priority_level": 1,
            "is_root_category": false
          },{headers: {
        "content-type": "application/json"}}).pipe(
          catchError((err) => {
            return throwError(err);    //Rethrow it back to component
          }));
        
      
      }
  

}