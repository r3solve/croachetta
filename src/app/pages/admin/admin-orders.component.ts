import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppwriteService } from '../../services/appwrite.service';

@Component({
    selector: 'app-admin-orders',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-stone-900">Orders</h1>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-stone-50 border-b border-stone-200">
            <tr>
              <th class="p-4 font-medium text-stone-600">Order #</th>
              <th class="p-4 font-medium text-stone-600">Customer</th>
              <th class="p-4 font-medium text-stone-600">Date</th>
              <th class="p-4 font-medium text-stone-600">Total</th>
              <th class="p-4 font-medium text-stone-600">Items</th>
              <th class="p-4 font-medium text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            @for(order of orders(); track order.$id) {
            <tr class="hover:bg-stone-50 transition-colors">
              <td class="p-4 font-medium text-stone-900">{{order.orderNumber}}</td>
              <td class="p-4">
                  <div class="font-medium text-stone-900">{{order.customerName}}</div>
                  <div class="text-sm text-stone-500">{{order.customerPhone}}</div>
                  <div class="text-xs text-stone-400 mt-1">{{order.customerLocation}}</div>
              </td>
              <td class="p-4 text-stone-600">{{order.orderDate | date:'mediumDate'}}</td>
              <td class="p-4 text-stone-900 font-medium">GHS {{order.totalAmount | number:'1.2-2'}}</td>
              <td class="p-4">
                  <button (click)="viewItems(order)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View {{parseItems(order.items).length}} Items
                  </button>
              </td>
              <td class="p-4 text-right">
                <div class="flex justify-end gap-2">
                    <button (click)="completeOrder(order.$id)" class="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm font-medium transition-colors">
                        Completed
                    </button>
                    <button (click)="deleteOrder(order.$id)" class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium transition-colors">
                        Delete
                    </button>
                </div>
              </td>
            </tr>
            }
            @if(orders().length === 0) {
                <tr>
                    <td colspan="6" class="p-8 text-center text-stone-500">No orders found.</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    <!-- Items Modal -->
    @if(selectedOrder()) {
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="p-6 border-b border-stone-100 flex justify-between items-center">
          <h2 class="text-xl font-bold text-stone-900">Order Items - {{selectedOrder().orderNumber}}</h2>
          <button (click)="selectedOrder.set(null)" class="text-stone-400 hover:text-stone-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[60vh]">
            <div class="space-y-4">
                @for(item of parseItems(selectedOrder().items); track $index) {
                <div class="flex items-center gap-4 p-4 bg-stone-50 rounded-lg border border-stone-100">
                    <div class="flex-1">
                        <h4 class="font-medium text-stone-900">{{item.productName}}</h4>
                        <div class="text-sm text-stone-500 mt-1">
                            Color: <span class="capitalize">{{item.color}}</span> | Size: {{item.size}}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-stone-900 font-medium">{{item.price}}</div>
                        <div class="text-sm text-stone-500">Qty: {{item.quantity}}</div>
                    </div>
                </div>
                }
            </div>
        </div>

        <div class="p-6 bg-stone-50 flex justify-end">
          <button (click)="selectedOrder.set(null)" class="px-5 py-2 bg-stone-900 text-white font-medium hover:bg-stone-700 rounded-lg transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
    }
  `
})
export class AdminOrdersComponent implements OnInit {
    appwriteService = inject(AppwriteService);
    orders = signal<any[]>([]);
    selectedOrder = signal<any>(null);

    ngOnInit() {
        this.fetchOrders();
    }

    async fetchOrders() {
        try {
            const response = await this.appwriteService.getOrders();
            this.orders.set(response.documents);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        }
    }

    parseItems(itemsString: string): any[] {
        try {
            return JSON.parse(itemsString);
        } catch (e) {
            return [];
        }
    }

    viewItems(order: any) {
        this.selectedOrder.set(order);
    }

    async completeOrder(id: string) {
        if (confirm('Mark this order as completed? This will remove it from the list.')) {
            await this.deleteOrderImpl(id);
        }
    }

    async deleteOrder(id: string) {
        if (confirm('Are you sure you want to delete this order?')) {
            await this.deleteOrderImpl(id);
        }
    }

    private async deleteOrderImpl(id: string) {
        try {
            await this.appwriteService.deleteOrder(id);
            this.fetchOrders(); // Refresh
        } catch (error) {
            console.error('Failed to update order', error);
        }
    }
}
