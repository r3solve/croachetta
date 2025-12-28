import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-stone-100">
      <div class="container mx-auto px-4 h-20 flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="text-2xl font-bold text-stone-800 tracking-tight">
          Yarns & Needle
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a routerLink="/" routerLinkActive="text-orange-500" [routerLinkActiveOptions]="{exact: true}" class="text-stone-600 hover:text-stone-900 font-medium transition-colors">Home</a>
          <a routerLink="/shop" routerLinkActive="text-orange-500" class="text-stone-600 hover:text-stone-900 font-medium transition-colors">Shop</a>
          <a routerLink="/about" routerLinkActive="text-orange-500" class="text-stone-600 hover:text-stone-900 font-medium transition-colors">About me</a>
          <a routerLink="/contact" routerLinkActive="text-orange-500" class="text-stone-600 hover:text-stone-900 font-medium transition-colors">Contact</a>
        </nav>

        <!-- Cart & Mobile Toggle -->
        <div class="flex items-center gap-4">
          <a routerLink="/cart" class="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
            <span class="font-medium mr-1">Cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent { }
