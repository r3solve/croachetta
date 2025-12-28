import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    products = signal<Product[]>([
        { id: 1, productName: 'Crop Top', price: 'GHS 80.00', image: '/crop-top-2.webp', category: 'Women' },
        { id: 2, productName: 'Hand Bag', price: 'GHS 108.00', image: '/bag.webp', category: 'Accessories' },
        { id: 3, productName: 'Cozy Knit Throw', price: 'GHS 85.00', image: '/crop-top.webp', category: 'Home Decor' },
        { id: 4, productName: 'Unisex Beannie', price: 'GHS 42.00', image: '/featured-hat.jpeg', category: 'Accessories' }
    ]);

    addProduct(product: Product) {
        this.products.update(current => [...current, product]);
    }

    deleteProduct(id: number | string) {
        this.products.update(current => current.filter(p => p.id !== id));
    }
}
