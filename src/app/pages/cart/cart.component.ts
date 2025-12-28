import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="pt-28 pb-12 bg-[#FDFBF9] min-h-screen">
      <div class="container mx-auto px-4 max-w-2xl text-center">
        <h1 class="text-4xl font-bold text-stone-900 mb-8">Shopping cart</h1>
        
        <div class="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center">
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
      </div>
    </div>
  `
})
export class CartComponent { }
