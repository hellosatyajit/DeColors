import { Repository } from "@/server/service/repository/RepositoryService";
import { IProductService } from "./IProductService";
import { IProduct } from "@/types/product";

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
}
