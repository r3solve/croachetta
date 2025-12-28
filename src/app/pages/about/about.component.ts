import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pt-28 pb-20 bg-[#FDFBF9] min-h-screen">
      <div class="container mx-auto px-4">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-6xl mx-auto">
           <!-- Image Section -->
           <div class="relative order-2 md:order-1">
              <div class="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg bg-stone-200">
                <img src="/about-me.jpg" alt="Betty crocheting" class="w-full h-full object-cover">
              </div>
              <!-- Decorative backing -->
              <div class="absolute -z-10 top-8 -left-8 w-full h-full border-2 border-stone-200 rounded-2xl hidden md:block"></div>
           </div>

           <!-- Text Section -->
           <div class="order-1 md:order-2">
             <span class="text-orange-500 font-medium tracking-wide uppercase text-sm mb-4 block">About Me</span>
             <h1 class="text-4xl md:text-5xl font-bold text-stone-900 mb-8 leading-tight">Crafting joy, one stitch at a time.</h1>
             
             <div class="prose prose-stone prose-lg text-stone-600">
               <p class="mb-6">
                 Hi there! I'm Betty. I started <strong>Yarns & Needle</strong> because I believe every child deserves a unique, handmade friend to grow up with. 
               </p>
               <p class="mb-6">
                 Crocheting has been my passion since I was a little girl. My grandmother taught me the basics on her porch during long sunny afternoons, and I've been hooked ever since.
               </p>
               <p>
                 When I'm not crafting new animal friends in my cozy studio, you can find me hiking in the mountains, baking chocolate chip cookies, or dreaming up the next collection of cuddly companions.
               </p>
             </div>

             <div class="mt-10" >
                <img src="/signature.png" alt="" class="h-12 opacity-60" onerror="this.style.display='none'">
             </div>
           </div>
        </div>

      </div>
    </div>
  `
})
export class AboutComponent { }
