export interface ProductTechnicalAttributes {

    feature_attributes: FeatureAttributes[];
    technical_attributes: TechnicalAttributes[];
    product_notes: string[];
}

export interface FeatureAttributes {
    key: string;
    value: string;
}

export interface TechnicalAttributes{
    key: string;
    value: string;

}