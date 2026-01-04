import { Injectable, signal, effect, inject } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
    id: string; // Unique ID for the cart item (product ID + variants)
    product: Product;
    quantity: number;
    color: string;
    size: string;
}

import { AppwriteService } from './appwrite.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private appwriteService = inject(AppwriteService);
    cartItems = signal<CartItem[]>([]);

    constructor() {
        // Load from localStorage on init
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cartItems.set(JSON.parse(savedCart));
        }

        // Save to localStorage whenever cart changes
        effect(() => {
            localStorage.setItem('cart', JSON.stringify(this.cartItems()));
        });
    }

    addToCart(product: Product, quantity: number, color: string, size: string) {
        const uniqueId = `${product.id}-${color}-${size}`;
        const currentItems = this.cartItems();
        const existingItem = currentItems.find(item => item.id === uniqueId);

        if (existingItem) {
            this.cartItems.update(items =>
                items.map(item =>
                    item.id === uniqueId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            this.cartItems.update(items => [
                ...items,
                {
                    id: uniqueId,
                    product,
                    quantity,
                    color,
                    size
                }
            ]);
        }
    }

    removeFromCart(itemId: string) {
        this.cartItems.update(items => items.filter(item => item.id !== itemId));
    }

    updateQuantity(itemId: string, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(itemId);
            return;
        }
        this.cartItems.update(items =>
            items.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    }

    async checkout(customer: { name: string, phone: string, location: string }) {
        try {
            const orderData = {
                orderNumber: 'ORD-' + Date.now(), // Simple unique ID generation
                customerName: customer.name,
                customerPhone: customer.phone,
                customerLocation: customer.location,
                orderDate: new Date().toISOString(),
                totalAmount: this.totalPrice,
                status: 'pending',
                items: JSON.stringify(this.cartItems().map(item => ({
                    productId: item.product.id,
                    productName: item.product.productName,
                    quantity: item.quantity,
                    color: item.color,
                    size: item.size,
                    price: item.product.price
                })))
            };

            console.log('Sending order to Appwrite:', orderData);
            await this.appwriteService.createOrder(orderData);

            this.cartItems.set([]); // Clear cart on success
            return true;
        } catch (error) {
            console.error('Checkout failed:', error);
            throw error;
        }
    }

    get totalItems() {
        return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
    }

    get totalPrice() {
        return this.cartItems().reduce((acc, item) => {
            // Removing 'GHS ' and ',' to parse float, assuming price format "GHS 80.00"
            const priceString = String(item.product.price).replace(/[^0-9.]/g, '');
            const price = parseFloat(priceString) || 0;
            return acc + (price * item.quantity);
        }, 0);
    }
}
