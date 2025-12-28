import { Component } from "@angular/core";
import { RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'app-admin-base',
    template: `
      <div class="flex min-h-screen bg-stone-50">
        <!-- Sidebar -->
        <aside class="w-64 bg-white border-r border-stone-200 fixed inset-y-0 left-0 z-50">
          <div class="p-6 border-b border-stone-100">
             <h2 class="text-xl font-bold tracking-tight text-stone-900">Admin Portal</h2>
          </div>
          <nav class="p-4 space-y-1">
             <a routerLink="/admin/home" routerLinkActive="bg-stone-100 text-stone-900 font-semibold" class="flex items-center gap-3 px-4 py-3 text-stone-600 rounded-lg hover:bg-stone-50 hover:text-stone-900 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
               Home
             </a>
             <!-- Future sidebar items can go here -->
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 ml-64">
           <router-outlet></router-outlet>
        </main>
      </div>
    `,
    imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class AdminBaseComponent {

}
