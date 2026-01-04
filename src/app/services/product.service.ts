import { Injectable, signal, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { AppwriteService } from './appwrite.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private appwriteService = inject(AppwriteService);
    products = signal<Product[]>([]);

    constructor() {
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const response = await this.appwriteService.getProducts();
            const mappedProducts = response.documents.map((doc: any) => ({
                id: doc.$id,
                productName: doc.productName,
                description: doc.description,
                price: typeof doc.price === 'string' ? doc.price.replace(/GHS\s*/i, '').trim() : doc.price,
                category: doc.category,
                image: doc.image,
                createdAt: doc.$createdAt
            } as Product));
            this.products.set(mappedProducts);
        } catch (error) {
            console.error('Failed to load products', error);
        }
    }

    async addProduct(product: Product) {
        // Optimistic update or wait for backend? 
        // Admin side handles adding. This service reflects the global state.
        // For now, let's assume this service is mainly for reading state in the shop.
        // If we want to support adding via this service, we should call Appwrite.
        // But the previous implementation had separate add logic in AdminHomeComponent.
        // I'll keep the local update method compatible but it might be better to just reload.
        this.products.update(current => [...current, product]);
    }

    deleteProduct(id: number | string) {
        this.products.update(current => current.filter(p => p.id !== id));
    }

    getProduct(id: number | string): Product | undefined {
        return this.products().find(p => p.id == id);
    }
}
