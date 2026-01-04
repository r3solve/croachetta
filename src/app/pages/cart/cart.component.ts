import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="pt-28 pb-12 bg-[#FDFBF9] min-h-screen">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-4xl font-bold text-stone-900 mb-8 text-center">Shopping Cart</h1>
        
        <div *ngIf="cartItems().length === 0; else cartContent" class="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center">
           <div class="mb-6 text-stone-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
               <circle cx="9" cy="21" r="1"></circle>
               <circle cx="20" cy="21" r="1"></circle>
               <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
             </svg>
           </div>
           <h2 class="text-xl font-medium text-stone-900 mb-2">Your shopping cart is empty now.</h2>
           <p class="text-stone-500 mb-8">You can change that! Pick something from the store.</p>
           
           <a routerLink="/shop" class="px-8 py-3 bg-[#2C3E50] text-white font-medium rounded hover:bg-[#34495E] transition-colors">
             Continue shopping
           </a>
        </div>

        <ng-template #cartContent>
            <div class="flex flex-col gap-6">
                <!-- Cart Items -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div *ngFor="let item of cartItems()" class="p-6 border-b last:border-b-0 border-stone-100 flex flex-col sm:flex-row items-center gap-6">
                        <!-- Image -->
                        <div class="w-24 h-24 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img [src]="item.product.image" [alt]="item.product.productName" class="w-full h-full object-cover">
                        </div>

                        <!-- Details -->
                        <div class="flex-1 text-center sm:text-left">
                            <h3 class="text-lg font-medium text-stone-900">{{item.product.productName}}</h3>
                            <div class="text-sm text-stone-500 mt-1 space-x-2">
                                <span class="capitalize">Color: {{item.color}}</span>
                                <span>|</span>
                                <span>Size: {{item.size}}</span>
                            </div>
                            <div class="text-[#8B5E3C] font-medium mt-2">GHS {{item.product.price}}</div>
                        </div>

                        <!-- Quantity -->
                        <div class="flex items-center border border-stone-200 rounded px-2 h-10">
                            <button (click)="updateQuantity(item.id, item.quantity - 1)" class="w-8 text-stone-500 hover:text-stone-900">-</button>
                            <span class="w-8 text-center font-medium">{{item.quantity}}</span>
                            <button (click)="updateQuantity(item.id, item.quantity + 1)" class="w-8 text-stone-500 hover:text-stone-900">+</button>
                        </div>

                        <!-- Remove -->
                        <button (click)="removeItem(item.id)" class="text-red-400 hover:text-red-600 p-2" title="Remove item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </div>

                <!-- Customer Details Form -->
                <div class="bg-white rounded-xl shadow-sm p-8">
                     <h3 class="text-xl font-bold text-stone-900 mb-6">Delivery Details</h3>
                     <div class="grid md:grid-cols-2 gap-6">
                         <div>
                             <label class="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                             <input type="text" [(ngModel)]="customerName" class="w-full h-12 px-4 rounded border border-stone-200 focus:border-[#2C3E50] focus:ring-0 transition-colors" placeholder="e.g. John Doe">
                         </div>
                         <div>
                             <label class="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                             <input type="tel" [(ngModel)]="customerPhone" class="w-full h-12 px-4 rounded border border-stone-200 focus:border-[#2C3E50] focus:ring-0 transition-colors" placeholder="e.g. 0541234567">
                         </div>
                         <div class="md:col-span-2">
                             <label class="block text-sm font-medium text-stone-700 mb-2">Delivery Location</label>
                             <textarea [(ngModel)]="customerLocation" class="w-full h-24 px-4 py-3 rounded border border-stone-200 focus:border-[#2C3E50] focus:ring-0 transition-colors resize-none" placeholder="e.g. House No. 123, Street Name, Accra"></textarea>
                         </div>
                     </div>
                </div>

                <!-- Summary -->
                <div class="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div class="text-center md:text-left">
                        <p class="text-stone-500 mb-1">Total ({{totalItems()}} items)</p>
                        <p class="text-3xl font-serif text-stone-900">GHS {{totalPrice() | number:'1.2-2'}}</p>
                    </div>
                    
                    <div class="flex gap-4">
                        <a routerLink="/shop" class="px-6 py-3 border border-stone-300 text-stone-600 font-medium rounded hover:bg-stone-50 transition-colors">
                            Continue Shopping
                        </a>
                        <button 
                            (click)="checkout()" 
                            [disabled]="!isValidOrder"
                            [class.opacity-50]="!isValidOrder"
                            [class.cursor-not-allowed]="!isValidOrder"
                            class="px-8 py-3 bg-[#2C3E50] text-white font-medium rounded hover:bg-[#34495E] transition-colors shadow-lg shadow-stone-200">
                            Send Order Request
                        </button>
                    </div>
                </div>
            </div>
        </ng-template>
      </div>
    </div>
  `
})
export class CartComponent {
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
  totalItems = computed(() => this.cartService.totalItems);
  totalPrice = computed(() => this.cartService.totalPrice);

  customerName = '';
  customerPhone = '';
  customerLocation = '';

  get isValidOrder() {
    return this.customerName.trim() && this.customerPhone.trim() && this.customerLocation.trim();
  }

  updateQuantity(id: string, qty: number) {
    this.cartService.updateQuantity(id, qty);
  }

  removeItem(id: string) {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeFromCart(id);
    }
  }

  isSubmitting = signal(false);

  async checkout() {
    if (!this.isValidOrder) return;

    this.isSubmitting.set(true);
    try {
      await this.cartService.checkout({
        name: this.customerName,
        phone: this.customerPhone,
        location: this.customerLocation
      });
      alert('Order sent successfully!');

      // Reset form
      this.customerName = '';
      this.customerPhone = '';
      this.customerLocation = '';
    } catch (error) {
      alert('Failed to send order. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
