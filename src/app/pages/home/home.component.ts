import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-[#f5f3f0] min-h-screen font-sans text-[#2d2d2d]">
      
      <!-- Hero Section -->
      <section class="relative min-h-screen flex items-center overflow-hidden">
        <div class="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div class="max-w-2xl pt-20 pb-32 md:pb-0">
            <span class="block text-stone-500 font-medium mb-4 text-sm md:text-base tracking-widest uppercase">Crafted with love</span>
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 tracking-tight">
              Unique Handmade<br/>Crochet
            </h1>
            <p class="text-lg text-stone-600 mb-10 leading-relaxed max-w-lg">
              Discover our collection of one-of-a-kind crochet treasures, from cozy home decor to charming accessories and gifts.
            </p>
            <div class="flex gap-4">
              <a routerLink="/shop" class="inline-block px-8 py-4 bg-stone-900 text-white font-medium hover:bg-stone-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Shop Collection
              </a>
              <a routerLink="/about" class="inline-block px-8 py-4 border-2 border-stone-300 text-stone-700 font-medium hover:border-stone-900 hover:text-stone-900 transition-all duration-300 rounded-lg">
                Our Story
              </a>
            </div>
          </div>
        </div>
        
        <!-- Hero Image Background Hint -->
        <div class="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-20 md:opacity-100 pointer-events-none z-0">
             <div class="absolute inset-0 bg-gradient-to-r from-[#f5f3f0] via-[#f5f3f0]/60 to-transparent z-10"></div>
             <img src="/hero.jpg" alt="Cozy Crochet Scene" class="w-full h-full object-cover object-center mask-image-gradient" />
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6 md:px-12 lg:px-20">
          <div class="text-center max-w-2xl mx-auto mb-16">
             <h2 class="text-3xl md:text-4xl font-bold mb-4">Curated Collections</h2>
             <p class="text-stone-500">Find the perfect handmade piece for every occasion.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Category 1 -->
            <a routerLink="/shop" class="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
              <img src="/man-in-knit.jpg" alt="Men" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div class="absolute inset-x-0 bottom-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-2xl font-bold mb-2">Men</h3>
                <span class="text-sm font-medium tracking-wide uppercase border-b border-white/0 group-hover:border-white transition-all pb-1 inline-block">View Items</span>
              </div>
            </a>
            
            <!-- Category 2 -->
            <a routerLink="/shop" class="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
              <img src="/fashion-7506174_1280.jpg" alt="Women" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div class="absolute inset-x-0 bottom-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-2xl font-bold mb-2">Women</h3>
                 <span class="text-sm font-medium tracking-wide uppercase border-b border-white/0 group-hover:border-white transition-all pb-1 inline-block">View Items</span>
              </div>
            </a>
            
            <!-- Category 3 -->
            <a routerLink="/shop" class="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
              <img src="/other.jpg" alt="Others" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div class="absolute inset-x-0 bottom-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-2xl font-bold mb-2">Others</h3>
                 <span class="text-sm font-medium tracking-wide uppercase border-b border-white/0 group-hover:border-white transition-all pb-1 inline-block">View Items</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section class="py-20 bg-[#f9f8f6]">
         <div class="container mx-auto px-6 md:px-12 lg:px-20">
             <div class="flex flex-col md:flex-row justify-between items-center gap-12">
                 <div class="flex flex-col items-center text-center max-w-xs">
                     <div class="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-6 text-stone-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                     </div>
                     <h3 class="text-xl font-bold mb-3">100% Handmade</h3>
                     <p class="text-stone-500 leading-relaxed">Every stitch is made by hand, ensuring unique quality and character in each piece.</p>
                 </div>
                 <div class="flex flex-col items-center text-center max-w-xs">
                     <div class="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-6 text-stone-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.74 5.88-5.74 5.88-5.74-5.88z"></path><path d="M11 19.8l1-1 1 1"></path><path d="M17.65 15.6l-5.65 8.4-5.65-8.4"></path></svg>
                     </div>
                     <h3 class="text-xl font-bold mb-3">Premium Materials</h3>
                     <p class="text-stone-500 leading-relaxed">We use only soft, durable, and eco-friendly yarns that are safe and long-lasting.</p>
                 </div>
                 <div class="flex flex-col items-center text-center max-w-xs">
                     <div class="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-6 text-stone-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                     </div>
                     <h3 class="text-xl font-bold mb-3">Made to Order</h3>
                     <p class="text-stone-500 leading-relaxed">Custom colors and designs available. We craft exactly what you're dreaming of.</p>
                 </div>
             </div>
         </div>
      </section>

      <!-- Featured Favorites -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6 md:px-12 lg:px-20">
           <div class="flex justify-between items-end mb-12">
               <div>
                  <h2 class="text-3xl md:text-4xl font-bold mb-2">Featured Favorites</h2>
                  <p class="text-stone-500">Our most loved creations this month.</p>
               </div>
               <a routerLink="/shop" class="hidden md:inline-flex items-center font-medium text-stone-900 border-b-2 border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors">
                  View All
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
               </a>
           </div>

           <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               @for(item of featuredItems; track item.id) {
                 <div class="group cursor-pointer">
                    <div class="relative overflow-hidden rounded-xl bg-stone-100 aspect-square mb-4">
                       <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div class="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                       </div>
                    </div>
                    <h4 class="font-bold text-lg mb-1">{{item.name}}</h4>
                    <p class="text-stone-500">{{item.price}}</p>
                 </div>
               }
           </div>
           
           <div class="mt-12 text-center md:hidden">
                <a routerLink="/shop" class="inline-block px-8 py-3 border border-stone-300 rounded-lg text-stone-900 font-medium">View All Products</a>
           </div>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="py-24 bg-[#2d2d2d] text-white">
          <div class="container mx-auto px-6 md:px-12 lg:px-20 text-center">
              <h2 class="text-3xl md:text-4xl font-bold mb-4">Join our Crochet Circle</h2>
              <p class="text-stone-300 mb-10 max-w-lg mx-auto">Subscribe for updates on new patterns, product drops, and exclusive discounts.</p>
              
              <div class="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                  <input type="email" placeholder="Your email address" class="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-white/50" />
                  <button class="px-8 py-4 bg-white text-stone-900 font-bold rounded-lg hover:bg-stone-100 transition-colors">Subscribe</button>
              </div>
          </div>
      </section>
    </div>
  `
})
export class HomeComponent {
  featuredItems = [
    { id: 1, name: 'Crop Top', price: 'GHS 80.00', image: '/crop-top-2.webp' },
    { id: 2, name: 'Hand Bag', price: 'GHS 108.00', image: '/bag.webp' },
    { id: 3, name: 'Cozy Knit Throw', price: 'GHS 85.00', image: '/crop-top.webp' },
    { id: 4, name: 'Unisex Beannie', price: 'GHS 42.00', image: '/featured-hat.jpeg' }
  ];
}
