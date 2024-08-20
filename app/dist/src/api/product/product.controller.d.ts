import { ProductResponse, ProductService } from './product.service';
import { ProductDto } from './DTO/product.dto';
import { UpdateProductDto } from './DTO/update.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    SearchForProductAsAdmin(query: any): Promise<ProductResponse>;
    SearchForProductAsManager(req: any, query: any): Promise<ProductResponse>;
    createProduct(productData: ProductDto, req: any): Promise<ProductResponse>;
    updateValueProduct(productData: UpdateProductDto, req: any): Promise<ProductResponse>;
    removeMerchandise(productData: UpdateProductDto, req: any): Promise<ProductResponse>;
}
