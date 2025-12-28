import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-stone-900 mb-2">Welcome Back</h1>
            <p class="text-stone-500">Sign in to manage your store</p>
        </div>

        <form (ngSubmit)="login()" class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
                <input type="email" [(ngModel)]="email" name="email" required 
                       class="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none transition-all placeholder-stone-400" 
                       placeholder="admin@croacheta.com" />
            </div>

            <div>
                <label class="block text-sm font-medium text-stone-700 mb-2">Password</label>
                <input type="password" [(ngModel)]="password" name="password" required 
                       class="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none transition-all placeholder-stone-400" 
                       placeholder="••••••••" />
            </div>

            <button type="submit" 
                    class="w-full bg-stone-900 text-white py-3.5 rounded-lg font-bold hover:bg-stone-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 duration-200">
              Sign In
            </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
    authService = inject(AuthService);

    email = '';
    password = '';

    login() {
        // For now, allow any non-empty input or just proceed since it's a mock
        if (this.email === "admin@site.com" && this.password === "admin") {
            this.authService.login();
        } else {
            // Optional: Add basic validation visual feedback
            alert('Invalid email or password');
        }
    }
}