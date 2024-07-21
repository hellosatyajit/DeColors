import { Repository } from "@/server/service/repository/RepositoryService";
import { IProductService } from "./IProductService";
import { IProduct } from "@/types/product";
import { Review } from "@/types/product";
export class ProductService implements IProductService {
  private repository: Repository<IProduct>;

  constructor() {
    this.repository = new Repository<IProduct>("products");
  }

  async searchProducts(
    filter: Partial<IProduct>,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: IProduct[]; totalCount: number }> {
    return this.repository.find(filter, page, limit);
  }

  async addReview(
    id: string,
    review: { name: string, rating: number, review: string, date: Date }
  ): Promise<IProduct> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.rating) {
      product.rating = { reviews: [] };
    }

    await this.repository.updateById(id, {
      rating: {
        reviews: [...(product.rating.reviews || []), review],
      },
    });

    return this.repository.findById(id) as Promise<IProduct>;
  }
  async incrementSoldCount(id: any,productSoldCount:number, quantity: number): Promise<void> {
    await this.repository.update(id, { soldCount: productSoldCount  + quantity });
  }
}