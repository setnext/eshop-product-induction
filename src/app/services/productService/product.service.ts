import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ConfigService } from "../cofigServices/config.service";
import { ProductMetaData } from "src/app/interfaces/product-metadata";
import { ProductVariants } from "src/app/interfaces/product-variant";
import { LocalService } from "../storage/local.service";
import { ObjectType } from "src/app/interfaces/User";
import { MarkettingAttributes } from "src/app/interfaces/marketting-attributes";
import { ProductTechnicalAttributes } from "src/app/interfaces/technical-attributes";
import { PriceInfo } from "src/app/interfaces/PriceInfo";
import { TaxInfo } from "src/app/interfaces/TaxInfo";
import { StockInfo } from "src/app/interfaces/StockInfo";
import { ProductEntity } from "src/app/interfaces/product";



@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient, private localStorageService: LocalService) {

  }

  metaData: ProductMetaData = {} as ProductMetaData;
  productVariant: ProductVariants = {} as ProductVariants;
  markettingAttributes: MarkettingAttributes ={} as MarkettingAttributes;
  technicalAttributes:ProductTechnicalAttributes = {} as ProductTechnicalAttributes;
  priceInfo = {} as PriceInfo;
  taxInfo = {} as TaxInfo;
  stockInfo = {} as StockInfo;

  saveMetaData(metaData: ProductMetaData) {

    console.log("Product Metadata Save Call");
    this.metaData = metaData;
    this.localStorageService.saveData("productMetaData", JSON.stringify(this.metaData), ObjectType.json, false);
    console.log("Local Save Successful");
  }

  getMetaData() {
    console.log("get MetaData Called");
    let data = this.localStorageService.getData("productMetaData", ObjectType.json, false);
    
    if (data == null) {
      return this.metaData;;
    }
    else {
      this.metaData = JSON.parse(this.localStorageService.getData("productMetaData", ObjectType.json, false));
      return this.metaData;
    }


  }
  getProductsByCategory(parentCategory:string,subCategory:string) {
    console.log(" get ProductsByCategory Called");
    return this.http.get<any>('http://localhost:8082/products/categories/'+parentCategory+subCategory).pipe(
      catchError((err) => {
        return throwError(err);    //Rethrow it back to component
      }));

  }

  clearLocalData() {
    console.log("Clear Data Called");

    this.localStorageService.removeData("productMetaData");
    this.metaData = {} as ProductMetaData;

  }
  clearTechnicalAttributesData() {
    console.log("Clear Data Called");

    this.localStorageService.removeData("technicalAttributes");
    this.technicalAttributes = {} as ProductTechnicalAttributes;

  }
  clearMarkettingAttributesData() {
    console.log("Clear Data Called");

    this.localStorageService.removeData("markettingAttributes");
    this.markettingAttributes = {} as MarkettingAttributes;

  }

  clearUploadedFiles(){
    console.log("Clearing Media Files");
    this.localStorageService.removeData("uploadedFiles");
  }
  clearProductVariantsData() {
    console.log("Clear Data Called");

    this.localStorageService.removeData("productVariantData");
    this.productVariant = {} as ProductVariants;

  }

  getVariantData() {
    console.log("get Variant Data Called");
    let data = this.localStorageService.getData("productVariantData", ObjectType.json, false);
    console.log
    if (data == null) {
      return this.productVariant;;
    }
    else {
      this.productVariant = JSON.parse(data);

      return this.productVariant;
    }

  }

  
  getMarkettingAttributesData() {
    console.log("get Marketting Attributes Called");
    let data = this.localStorageService.getData("markettingAttributes", ObjectType.json, false);
    console.log
    if (data == null) {
      return this.markettingAttributes;;
    }
    else {
      this.markettingAttributes = JSON.parse(data);

      return this.markettingAttributes;
    }

  }
  getTechnicalAttributesData() {
    console.log("get Technical Attributes Called");
    let data = this.localStorageService.getData("technicalAttributes", ObjectType.json, false);
    console.log
    if (data == null) {
      return this.technicalAttributes;;
    }
    else {
      this.technicalAttributes = JSON.parse(data);

      return this.technicalAttributes;
    }

  }

  getPriceInfo() {
    console.log("get Price Attributes Called");
    let data = this.localStorageService.getData("priceInfo", ObjectType.json, false);
    console.log
    if (data == null) {
      return this.priceInfo;;
    }
    else {
      this.priceInfo = JSON.parse(data);

      return this.priceInfo;
    }

  }
  getTaxInfo() {
    console.log("get Tax Attributes Called");
    let data = this.localStorageService.getData("taxInfo", ObjectType.json, false);
    console.log
    if (data == null) {
      return this.taxInfo;;
    }
    else {
      this.taxInfo = JSON.parse(data);

      return this.taxInfo;
    }

  }
  getStockInfo() {
    console.log("get Stock Attributes Called");
    let data = this.localStorageService.getData("stockInfo", ObjectType.json, false);
    console.log
    if (data == null) {
      return this.stockInfo;;
    }
    else {
      this.stockInfo = JSON.parse(data);

      return this.stockInfo;
    }

  }
  saveVariantData(variantData: ProductVariants) {

    console.log("Product Variant Data Save Call");
    this.productVariant = variantData;
    this.localStorageService.saveData("productVariantData", JSON.stringify(this.productVariant), ObjectType.json, false);
    console.log("Local Save Successful");
  }

  saveMarkettingAttributes(markettingAttributes: MarkettingAttributes) {

    console.log("Marketting Attributes Data Save Call");
    this.markettingAttributes = markettingAttributes;
    this.localStorageService.saveData("markettingAttributes", JSON.stringify(this.markettingAttributes), ObjectType.json, false);
    console.log("Local Save Successful");
  }
  savePriceInfo(priceInfo: PriceInfo) {

    console.log("PriceInfo  Data Save Call");
    this.priceInfo = priceInfo;
    this.localStorageService.saveData("priceInfo", JSON.stringify(this.priceInfo), ObjectType.json, false);
    console.log("Local Save Successful");
  }
  saveStockInfo(stockInfo: StockInfo) {

    console.log("Stock  Data Save Call");
    this.stockInfo = stockInfo;
    this.localStorageService.saveData("stockInfo", JSON.stringify(this.stockInfo), ObjectType.json, false);
    console.log("Local Save Successful");
  }
  saveTaxInfo(taxInfo: TaxInfo) {

    console.log("Tax Data Save Call");
    this.taxInfo = taxInfo;
    this.localStorageService.saveData("taxInfo", JSON.stringify(this.taxInfo), ObjectType.json, false);
    console.log("Local Save Successful");
  }

  saveTechnicalAttributes(technicalAttributes: ProductTechnicalAttributes) {

    console.log("TechnicalAttributes  Data Save Call");
    this.technicalAttributes = technicalAttributes;
    this.localStorageService.saveData("technicalAttributes", JSON.stringify(this.technicalAttributes), ObjectType.json, false);
    console.log("Local Save Successful");
  }

  saveProduct(productEntity:ProductEntity){
  

  return this.http.post<any>('http://localhost:8082/products', productEntity,{
    headers: {"content-type": "application/json"},
    observe: "response", // to display the full response & as 'body' for type cast
    responseType: "json"
},).pipe(
    catchError((err) => {
      return throwError(err);    //Rethrow it back to component
    }));
  

  }

  findProductByName(productName:String){
    return this.http.get<any>('http://localhost:8082/products/find/'+productName,{
      headers: {"content-type": "application/json"},
  },).pipe(
      catchError((err) => {
        return throwError(err);    //Rethrow it back to component
      }));
    
  
    }
}