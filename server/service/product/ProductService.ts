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
    productName: string,
    review: { name: string, rating: number, review: string, date: Date }
  ): Promise<IProduct> {
    const product = await this.repository.findByName(productName);
    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.rating) {
      product.rating = { reviews: [] };
    }

    await this.repository.updateByName(productName, {
      rating: {
        reviews: [...(product.rating.reviews || []), review],
      },
    });

    return this.repository.findByName(productName) as Promise<IProduct>;
  }
}