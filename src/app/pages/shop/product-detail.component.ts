import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="pt-28 pb-12 bg-[#FDFBF9] min-h-screen">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="mb-8">
            <a routerLink="/shop" class="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back to Shop
            </a>
        </div>

        <div *ngIf="product() as p" class="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm">
          <!-- Image Section -->
          <div class="aspect-square bg-stone-100 rounded-xl overflow-hidden">
            <img [src]="p.image" [alt]="p.productName" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
          </div>

          <!-- Details Section -->
          <div class="flex flex-col justify-center">
             <span class="text-sm font-medium text-stone-500 uppercase tracking-wider mb-2">{{p.category}}</span>
             <h1 class="text-4xl font-serif text-stone-900 mb-4">{{p.productName}}</h1>
             <p class="text-2xl font-medium text-[#8B5E3C] mb-8">{{p.price}}</p>

             <!-- Options -->
             <div class="space-y-6 mb-8">
                <!-- Color -->
                <div>
                    <label class="block text-sm font-medium text-stone-700 mb-3">Select Color</label>
                    <div class="flex gap-3">
                        <button *ngFor="let color of colors" 
                            (click)="selectedColor.set(color)"
                            [class.ring-2]="selectedColor() === color"
                            [class.ring-offset-2]="selectedColor() === color"
                            class="w-10 h-10 rounded-full border border-stone-200 focus:outline-none transition-all"
                            [style.background-color]="colorMap[color]"
                            [title]="color">
                        </button>
                    </div>
                    <p class="text-sm text-stone-500 mt-2">Selected: <span class="font-medium text-stone-900 capitalize">{{selectedColor()}}</span></p>
                </div>

                <!-- Size -->
                <div>
                     <label class="block text-sm font-medium text-stone-700 mb-3">Select Size</label>
                     <div class="flex gap-3">
                        <button *ngFor="let size of sizes"
                            (click)="selectedSize.set(size)"
                            [class.bg-stone-900]="selectedSize() === size"
                            [class.text-white]="selectedSize() === size"
                            [class.border-stone-900]="selectedSize() === size"
                            class="w-12 h-12 rounded border border-stone-200 flex items-center justify-center font-medium transition-colors hover:border-stone-900">
                            {{size}}
                        </button>
                     </div>
                </div>
             </div>

             <!-- Description (Placeholder) -->
             <p class="text-stone-600 mb-8 leading-relaxed">
                Handcrafted with premium materials, this {{p.productName}} is designed to bring warmth and style to your life. Perfect for any occasion.
             </p>

             <!-- Actions -->
             <div class="flex gap-4">
                <div class="flex items-center border border-stone-200 rounded px-3 h-12">
                    <button (click)="quantity.set(quantity() > 1 ? quantity() - 1 : 1)" class="w-8 text-stone-500 hover:text-stone-900 text-lg">-</button>
                    <span class="w-8 text-center font-medium">{{quantity()}}</span>
                    <button (click)="quantity.set(quantity() + 1)" class="w-8 text-stone-500 hover:text-stone-900 text-lg">+</button>
                </div>
                <button 
                    (click)="addToCart(p)"
                    class="flex-1 bg-[#2C3E50] text-white font-medium rounded hover:bg-[#34495E] transition-colors h-12 px-8 flex items-center justify-center gap-2">
                    Add to Cart
                </button>
             </div>
          </div>
        </div>

        <div *ngIf="!product()" class="text-center py-20">
            <h2 class="text-2xl font-serif text-stone-400">Product not found</h2>
            <a routerLink="/shop" class="text-[#8B5E3C] hover:underline mt-4 inline-block">Return to Shop</a>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailComponent {
    private route = inject(ActivatedRoute);
    private productService = inject(ProductService);
    private cartService = inject(CartService);

    product = signal<Product | undefined>(undefined);

    // Options
    colors = ['cream', 'charcoal', 'olive', 'terracotta'];
    colorMap: Record<string, string> = {
        'cream': '#F5F5DC',
        'charcoal': '#36454F',
        'olive': '#808000',
        'terracotta': '#E2725B'
    };
    sizes = ['S', 'M', 'L', 'XL'];

    // Selections
    selectedColor = signal('cream');
    selectedSize = signal('M');
    quantity = signal(1);

    constructor() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.product.set(this.productService.getProduct(id)); // Allow string comparison in service if needed
            }
        });
    }

    addToCart(product: Product) {
        this.cartService.addToCart(
            product,
            this.quantity(),
            this.selectedColor(),
            this.selectedSize()
        );
        alert('Added to cart!');
    }
}
