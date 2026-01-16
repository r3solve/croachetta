import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './shop.compoent.html'
})
export class ShopComponent {
  productService = inject(ProductService);
  products = this.productService.products;

  searchQuery = signal('');
  selectedCategory = signal('All');
  categories = ['All', 'Women', 'Men', 'Others'];

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();
    const allProducts = this.products();

    return allProducts.filter(product => {
      const matchesSearch = product.productName.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query));
      const matchesCategory = category === 'All' || product.category === category;

      return matchesSearch && matchesCategory;
    });
  });

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
