import { HorusProduct } from '@prisma/client';
import { ProductDto } from './DTO/product.dto';
import { UpdateProductDto } from './DTO/update.dto';
export interface ProductResponse {
    message: string;
    products?: HorusProduct[];
}
export declare class ProductService {
    searchProductAdmin(query: any): Promise<ProductResponse>;
    searchProductManager(companyId: string, query: any): Promise<ProductResponse>;
    createProduct(productData: ProductDto, userId: string, companyId: string): Promise<ProductResponse>;
    SendBatchProducts(updateProduct: UpdateProductDto, userId: string, companyId: string): Promise<ProductResponse>;
    RemoveMerchandiseProducts(updateProduct: UpdateProductDto, userId: string, companyId: string): Promise<ProductResponse>;
}
