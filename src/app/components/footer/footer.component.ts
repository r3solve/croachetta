import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-stone-50 pt-16 pb-8 border-t border-stone-100 mt-auto">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-stone-600">
          <div>
            <h3 class="font-bold text-stone-900 mb-4 text-lg">Meena</h3>
            <p class="text-sm leading-relaxed max-w-xs">
              Handmade crochet toys made with love and care for your little ones.
            </p>
          </div>
          
          <div>
            <h4 class="font-bold text-stone-900 mb-4">Company</h4>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/about" class="hover:text-orange-500 transition-colors">About us</a></li>
              <li><a href="#" class="hover:text-orange-500 transition-colors">Career</a></li>
              <li><a href="#" class="hover:text-orange-500 transition-colors">Contacts</a></li>
              <!-- <li><a routerLink="/admin" class="hover:text-orange-500 transition-colors">Admin</a></li> -->
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-stone-900 mb-4">Information</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-orange-500 transition-colors">Privacy policy</a></li>
              <li><a href="#" class="hover:text-orange-500 transition-colors">Terms and conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-stone-900 mb-4">Follow us</h4>
             <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-orange-500 transition-colors">Instagram</a></li>
              <li><a href="#" class="hover:text-orange-500 transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-stone-200 pt-8 text-center text-sm text-stone-500">
          <p>&copy; 2024 Yarns & Needle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }
