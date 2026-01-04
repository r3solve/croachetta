import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { AppwriteService } from '../../services/appwrite.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-stone-900">Product Dashboard</h1>
        <div class="flex gap-4">
            <button (click)="openModal()" class="bg-stone-900 text-white px-6 py-2.5 rounded-lg hover:bg-stone-700 transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Product
            </button>
            <button (click)="logout()" class="border border-stone-300 text-stone-700 px-6 py-2.5 rounded-lg hover:bg-stone-100 transition-colors">
              Logout
            </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-stone-50 border-b border-stone-200">
            <tr>
              <th class="p-4 font-medium text-stone-600">Product</th>
              <th class="p-4 font-medium text-stone-600">Description</th>
              <th class="p-4 font-medium text-stone-600">Category</th>
              <th class="p-4 font-medium text-stone-600">Date Added</th>
              <th class="p-4 font-medium text-stone-600">Price</th>
              <th class="p-4 font-medium text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            @for(product of products(); track product.id) {
            <tr class="hover:bg-stone-50 transition-colors">
              <td class="p-4">
                <div class="flex items-center gap-4">
                  <img [src]="product.image" alt="" class="w-12 h-12 rounded object-cover bg-stone-100" />
                  <span class="font-medium text-stone-900">{{product.productName}}</span>
                </div>
              </td>
              <td class="p-4 text-stone-600 max-w-xs truncate" title="{{product.description}}">{{product.description || '-'}}</td>
              <td class="p-4 text-stone-600">{{product.category}}</td>
              <td class="p-4 text-stone-600">{{product.createdAt | date:'mediumDate'}}</td>
              <td class="p-4 text-stone-600">{{product.price}}</td>
              <td class="p-4 text-right">
                <div class="flex justify-end gap-2">
                    <button disabled class="px-3 py-1 bg-stone-100 text-stone-400 rounded cursor-not-allowed text-sm font-medium">
                        Update
                    </button>
                    <button (click)="deleteProduct(product.id)" class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium transition-colors">
                        Delete
                    </button>
                </div>
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    @if(isModalOpen()) {
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="p-6 border-b border-stone-100 flex justify-between items-center">
          <h2 class="text-xl font-bold text-stone-900">Add New Product</h2>
          <button (click)="closeModal()" class="text-stone-400 hover:text-stone-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-stone-700 mb-1">Product Name</label>
            <input type="text" [(ngModel)]="newProduct.productName" class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none" placeholder="e.g. Cute Bear" />
          </div>

          <div>
             <label class="block text-sm font-medium text-stone-700 mb-1">Description</label>
             <textarea [(ngModel)]="newProduct.description" rows="3" class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none" placeholder="Product description..."></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
             <div>
                <label class="block text-sm font-medium text-stone-700 mb-1">Price</label>
                <input type="text" [(ngModel)]="newProduct.price" class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none" placeholder="e.g. GHS 50.00" />
             </div>
             <div>
                <label class="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select [(ngModel)]="newProduct.category" class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none bg-white">
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Others">Others</option>
                </select>
             </div>
          </div>

          <div>
             <label class="block text-sm font-medium text-stone-700 mb-1">Product Image</label>
             <input type="file" (change)="onFileSelected($event)" class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none" />
             @if(newProduct.image) {
               <div class="mt-2 h-32 bg-stone-100 rounded-lg overflow-hidden flex items-center justify-center border border-stone-200">
                 <img [src]="newProduct.image" alt="Preview" class="h-full object-contain" />
               </div>
             }
          </div>
        </div>

        <div class="p-6 bg-stone-50 flex justify-end gap-3">
          <button (click)="closeModal()" class="px-5 py-2 text-stone-600 font-medium hover:bg-stone-200 rounded-lg transition-colors">Cancel</button>
          <button (click)="submitProduct()" [disabled]="isUploading" class="px-5 py-2 bg-stone-900 text-white font-medium hover:bg-stone-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            @if(isUploading) {
                Uploading...
            } @else {
                Save Product
            }
          </button>
        </div>
      </div>
    </div>
    }
  `
})
export class AdminHomeComponent implements OnInit {
  productService = inject(ProductService);
  authService = inject(AuthService);
  appwriteService = inject(AppwriteService);

  // Initialize with empty array, will be populated from Appwrite
  products = signal<Product[]>([]);
  isModalOpen = signal(false);
  isUploading = false;
  selectedFile: File | null = null;

  newProduct = {
    productName: '',
    description: '',
    price: '',
    category: 'Women',
    image: ''
  };

  ngOnInit() {
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await this.appwriteService.getProducts();
      const mappedProducts = response.documents.map((doc: any) => ({
        id: doc.$id,
        productName: doc.productName,
        description: doc.description,
        price: doc.price,
        category: doc.category,
        image: doc.image,
        createdAt: doc.$createdAt
      } as Product));
      this.products.set(mappedProducts);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  logout() {
    this.authService.logout();
  }

  async deleteProduct(id: number | string) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await this.productService.deleteProduct(id); // Keep local state sync optional or remove if full reload
        await this.appwriteService.deleteProduct(String(id));
        console.log('Product deleted');
        this.fetchProducts();
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async submitProduct() {
    if (!this.newProduct.productName || !this.newProduct.price) return;

    this.isUploading = true;

    if (this.selectedFile) {
      try {
        const url = await this.appwriteService.uploadFile(this.selectedFile);
        if (url) {
          this.newProduct.image = url;
        }
      } catch (error) {
        console.error('Failed to upload image', error);
        this.isUploading = false;
        return;
      }
    }

    const product = {
      productName: this.newProduct.productName,
      description: this.newProduct.description,
      price: this.newProduct.price,
      category: this.newProduct.category,
      image: this.newProduct.image || '/api/placeholder/400/500' // fallback
    };

    console.log('Detailed Product Payload:', JSON.stringify(product, null, 2));

    try {
      await this.appwriteService.createProduct(product);
      console.log('Product saved to Appwrite:', product);
      this.closeModal();
      this.fetchProducts(); // Refresh list after add
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      this.isUploading = false;
    }
  }

  resetForm() {
    this.newProduct = {
      productName: '',
      description: '',
      price: '',
      category: 'Women',
      image: ''
    };
    this.selectedFile = null;
    this.isUploading = false;
  }
}