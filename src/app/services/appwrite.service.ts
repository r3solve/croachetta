import { Injectable } from "@angular/core";
import { Client, Account, Storage, Databases } from "appwrite";
import { ID } from "appwrite";

@Injectable({
    providedIn: 'root'
})
export class AppwriteService {
    private client = new Client();
    private account = new Account(this.client);
    private databases = new Databases(this.client);
    private appwriteEndpoint: string = 'https://fra.cloud.appwrite.io/v1';
    private appwriteProjectId: string = '6951205e00020c9e7ad3';
    private appwriteProjectName: string = 'minaa';
    private storage = new Storage(this.client);
    constructor() {
        this.client.setEndpoint(this.appwriteEndpoint).setProject(this.appwriteProjectId);
    }

    login(email: string, password: string) {
        return this.account.createEmailPasswordSession(email, password);
    }

    logout() {
        return this.account.deleteSession('current');
    }

    async uploadFile(file: File): Promise<string> {
        try {
            const newFileId = ID.unique();
            const bucketId = '695120cb000a1aeb6999';

            await this.storage.createFile(
                bucketId,
                newFileId,
                file
            );

            const result = this.storage.getFileView(
                bucketId,
                newFileId
            );

            return result.toString();
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    }

    async createProduct(data: any): Promise<any> {
        try {
            const databaseId = '695126ec00199061ee6e'; // Replace with actual Database ID
            const collectionId = 'products'; // Replace with actual Collection ID

            return await this.databases.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                data
            );
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    async getProducts(): Promise<any> {
        try {
            const databaseId = '695126ec00199061ee6e';
            const collectionId = 'products';

            return await this.databases.listDocuments(
                databaseId,
                collectionId
            );
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async deleteProduct(documentId: string): Promise<any> {
        try {
            const databaseId = '695126ec00199061ee6e';
            const collectionId = 'products';

            return await this.databases.deleteDocument(
                databaseId,
                collectionId,
                documentId
            );
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
    async createOrder(orderData: any): Promise<any> {
        try {
            const databaseId = '695126ec00199061ee6e';
            const collectionId = 'orders';

            return await this.databases.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                orderData
            );
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    async getOrders(): Promise<any> {
        try {
            const databaseId = '695126ec00199061ee6e';
            const collectionId = 'orders';

            return await this.databases.listDocuments(
                databaseId,
                collectionId
            );
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }

    async deleteOrder(documentId: string): Promise<any> {
        try {
            const databaseId = '695126ec00199061ee6e';
            const collectionId = 'orders';

            return await this.databases.deleteDocument(
                databaseId,
                collectionId,
                documentId
            );
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
}