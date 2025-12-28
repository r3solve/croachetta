export interface Product {
    id: number | string;
    productName: string;
    price: number | string;
    image: string;
    category?: string;
    isNew?: boolean;
}
