import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="pt-28 pb-12 bg-[#FDFBF9] min-h-screen">
      <div class="container mx-auto px-4 max-w-2xl">
        <h1 class="text-4xl font-bold text-stone-900 mb-8 text-center">Contact Me</h1>
        
        <div class="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <p class="text-stone-600 mb-8 text-center">
            Have a question about a custom order or just want to say hi? I'd love to hear from you!
          </p>
          
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-stone-700 mb-1">Name</label>
              <input type="text" class="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="Your name">
            </div>
            <div>
              <label class="block text-sm font-medium text-stone-700 mb-1">Email</label>
              <input type="email" class="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="your@email.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-stone-700 mb-1">Message</label>
              <textarea rows="4" class="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="How can I help you?"></textarea>
            </div>
            <button type="button" class="w-full py-3 bg-[#2C3E50] text-white font-medium rounded hover:bg-[#34495E] transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent { }
