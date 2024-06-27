import { IProduct } from "@/types/product";

export interface IProductService {
  searchProducts(
    filter: Partial<IProduct>
  ): Promise<{ data: IProduct[]; totalCount: number }>;
}
