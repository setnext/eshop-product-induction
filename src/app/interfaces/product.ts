import { ProductMetaData } from "./product-metadata";
import { ProductVariants } from "./product-variant";
import { MarkettingAttributes } from "./marketting-attributes";
import { FeatureAttributes, ProductTechnicalAttributes, TechnicalAttributes } from "./technical-attributes";
import { PriceInfo } from "./PriceInfo";
import { StockInfo } from "./StockInfo";
import { TaxInfo } from "./TaxInfo";

export interface ProductEntity {

    productName: string;
    productDescription:string;
    brand:string;
    primaryCategory:number;
    subCategories:string[];
    tags:string[];
    material:string;
    kind:string;
    mpn:string;
    // productMetaData: ProductMetaData;
    productImages: string[];
    productVariants : ProductVariants;
    commerceAttributes: MarkettingAttributes;
    priceInfo:PriceInfo;
    stockInfo:StockInfo;
    taxInfo:TaxInfo;
    feature_attributes:FeatureAttributes[];
    technical_attributes:TechnicalAttributes[];
    product_notes:string[]

}