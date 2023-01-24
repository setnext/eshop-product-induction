import { Component, Input, OnInit } from '@angular/core';
import { ProductEntity } from '../interfaces/product';
import { ProductMetaData } from '../interfaces/product-metadata';
import { ProductVariants } from "../interfaces/product-variant";
import { MarkettingAttributes } from "../interfaces/marketting-attributes";
import { ProductTechnicalAttributes, TechnicalAttributes } from "../interfaces/technical-attributes";
import { ProductService } from '../services/productService/product.service';
import { FileUploadService } from '../services/MediaService/fileupload.service';
import { ConfigService } from '../services/cofigServices/config.service';
import { faHome, faCheck, faStarHalf, faStarHalfStroke, faFileCircleExclamation, faTriangleExclamation, faClose, faExpandAlt, faHeart, faShoppingBag, faStar, faStarHalfAlt, faStarAndCrescent } from '@fortawesome/free-solid-svg-icons';
import { StepModel } from '../interfaces/steps';
import { StockInfo } from '../interfaces/StockInfo';
import { PriceInfo } from '../interfaces/PriceInfo';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit {

  @Input()
  step!: StepModel;

  productMetaData:ProductMetaData = {} as ProductMetaData;
  productMedias:any = [];
  productVariant:ProductVariants = {} as ProductVariants;
  markettingAttributes:MarkettingAttributes = {} as MarkettingAttributes;
  technicalAttributes:ProductTechnicalAttributes ={} as ProductTechnicalAttributes;
  stockInfo ={} as StockInfo;
  priceInfo = {} as PriceInfo;
  product:ProductEntity = {} as ProductEntity;
  imageUrl='';
  wishItem=true;
  faStar = faStar
  faStarHalf = faStarHalfAlt;
  faStarHalfStroke = faStarHalfStroke
  faStarAndCrescent = faStarAndCrescent



  constructor(private productService:ProductService,private uploadService: FileUploadService,private config:ConfigService) { }

  ngOnInit(): void {
    this.imageUrl = this.config.config.imageSourceUrl;

    this.retrieveProductData();
  }
  

  retrieveProductData() {

    this.productMetaData = this.productService.getMetaData() as ProductMetaData;
    this.productMedias = this.uploadService.getFiles();
    this.productVariant = this.productService.getVariantData() as ProductVariants;
    this.markettingAttributes = this.productService.getMarkettingAttributesData() as MarkettingAttributes;
    this.stockInfo = this.productService.getStockInfo() as StockInfo;
    this.priceInfo = this.productService.getPriceInfo() as PriceInfo;
    this.technicalAttributes = this.productService.getTechnicalAttributesData() as ProductTechnicalAttributes;
    console.log(this.product);
  
  }

  over(image:any){

    console.log(image);

    (document.getElementById('main-image') as HTMLImageElement).src = this.imageUrl+image+'?d=1000x1500';

    console.log('done');


  }
  wishlist(pid: any) {

    if (this.wishItem) {
      this.wishItem = false;
    }
    else {
      this.wishItem = true;
    }

    console.log(pid);

  }

}
