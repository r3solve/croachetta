import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.compoent.html'
})
export class ShopComponent {
  productService = inject(ProductService);
  products = this.productService.products;
}
