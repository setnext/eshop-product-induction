import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ConfigService } from "../cofigServices/config.service";
import { ProductMetaData } from "src/app/interfaces/product-metadata";



@Injectable({
    providedIn: 'root'
  })
  
  export class ProductService {
    metaData:ProductMetaData = {} as ProductMetaData;

    saveMetaData(metaData:ProductMetaData){

        this.metaData = metaData;

    }

    getMetaData(){
        
            return this.metaData;
        
    }


  }