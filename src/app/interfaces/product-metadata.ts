export interface ProductMetaData {

    productName: string;
    productDescription: string;
    primaryCategory: number;
    subCategories: string[];
    subCategorySelections: boolean[];
    tags: string[];
    brand: string;
    priceInfo: PriceInfo;
}

export interface PriceInfo {
    mrp_price: number;
    sales_price: number;
    discount: number
}