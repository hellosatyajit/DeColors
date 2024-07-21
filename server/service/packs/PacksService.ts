import { Repository } from "@/server/service/repository/RepositoryService";
import { IPacksService } from "./IPacksService";
import { IPacks } from "@/types/product";
import { Review } from "@/types/product";
export class PacksService implements IPacksService {
  private repository: Repository<IPacks>;

  constructor() {
    this.repository = new Repository<IPacks>("packs");
  }

  async searchProducts(
    filter: Partial<IPacks>,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: IPacks[]; totalCount: number }> {
    return this.repository.find(filter, page, limit);
  }
  async addReview(
    id: string,
    review: { name: string, rating: number, review: string, date: Date }
  ): Promise<IPacks> {
    const pack = await this.repository.findById(id);
    if (!pack) {
      throw new Error("Pack not found");
    }

    if (!pack.rating) {
      pack.rating = { reviews: [] };
    }

    await this.repository.updateById(id, {
      rating: {
        reviews: [...(pack.rating.reviews || []), review],
      },
    });

    return this.repository.findById(id) as Promise<IPacks>;
  }
  async incrementSoldCount(id: any,packSoldCount:number, quantity: number): Promise<void> {
    await this.repository.update(id, { soldCount: packSoldCount  + quantity });
  }
}
