export interface ProductVariants {

    colors: Colors[];
    sizes: string[];
    models: string[];
}

export interface Colors {
    name: string;
    value: string;
}